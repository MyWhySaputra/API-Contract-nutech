const { ResponseTemplate } = require("../helpers/templateHelper");
const { GenerateInvoice } = require("../helpers/invoiceHelper");
const pool = require("../database/db");

const invoiceNumber = GenerateInvoice();

async function Balence(req, res) {
  try {
    const userEmail = req.user.email;

    const query = await pool.query("SELECT * FROM users WHERE email = $1", [
      userEmail,
    ]);

    var balance = query.rows[0].balance;

    if (query.rows[0].balance === null) {
      balance = 0;
    }

    const data = {
      balance: balance,
    };

    let resp = ResponseTemplate(0, "Get Balance Berhasil", data);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  }
}
async function TopUp(req, res) {
  try {
    const { top_up_amount } = req.body;
    const email = req.user.email;

    if (top_up_amount <= 0) {
      let resp = ResponseTemplate(
        102,
        "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        null
      );
      res.status(400).json(resp);
      return;
    }

    const updateBalanceQuery = await pool.query(
      "UPDATE users SET balance = COALESCE(balance, 0) + $1 WHERE email = $2 RETURNING balance",
      [top_up_amount, email]
    );

    if (updateBalanceQuery.rowCount === 0) {
      let resp = ResponseTemplate(404, "User tidak ditemukan", null);
      res.status(404).json(resp);
      return;
    }

    await pool.query(
      "INSERT INTO transaction_history (email, invoice_number, transaction_type, description, total_amount) VALUES ($1, $2, $3, $4, $5)",
      [email, invoiceNumber, "TOPUP", "Top Up balance", top_up_amount]
    );

    const data = {
      balance: updateBalanceQuery.rows[0].balance,
    };

    let resp = ResponseTemplate(0, "Top Up Balance berhasil", data);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  }
}
async function Transaction(req, res) {
  try {
    const { service_code } = req.body;

    const email = req.user.email;

    const checkService = await pool.query(
      "SELECT * FROM services WHERE service_code = $1",
      [service_code]
    );

    if (checkService.rows.length === 0) {
      let resp = ResponseTemplate(
        102,
        "Service atau Layanan tidak ditemukan",
        null
      );
      res.status(400).json(resp);
      return;
    }

    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkUser.rows[0].balance < checkService.rows[0].service_tarif) {
      let resp = ResponseTemplate(102, "Saldo anda tidak mencukupi", null);
      res.status(400).json(resp);
      return;
    }

    await pool.query(
      "UPDATE users SET balance = balance - $1 WHERE email = $2",
      [checkService.rows[0].service_tarif, email]
    );

    const history = await pool.query(
      "INSERT INTO transaction_history (email, invoice_number, transaction_type, description, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        email,
        invoiceNumber,
        "PAYMENT",
        checkService.rows[0].service_name,
        checkService.rows[0].service_tarif,
      ]
    );

    const data = {
      invoice_number: history.rows[0].invoice_number,
      service_code: checkService.rows[0].service_code,
      service_name: checkService.rows[0].service_name,
      Transaction_type: history.rows[0].transaction_type,
      total_amount: history.rows[0].total_amount,
      created_on: history.rows[0].created_at,
    };

    let resp = ResponseTemplate(0, "Transaksi berhasil", data);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  }
}
async function TransactionHistory(req, res) {
  try {
    const email = req.user.email;

    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    let queryText =
      "SELECT invoice_number, transaction_type, description, total_amount, created_at as created_on FROM transaction_history WHERE email = $1 ORDER BY created_at DESC OFFSET $2";

    if (limit !== null) {
      queryText += " LIMIT $3";
    }

    const queryValues =
      limit !== null ? [email, offset, limit] : [email, offset];

    const query = await pool.query(queryText, queryValues);

    if (query.rows.length === 0) {
      let resp = ResponseTemplate(0, "Transaction History not found", null);
      res.status(200).json(resp);
      return;
    }

    const data = {
      offset: offset,
      limit: limit || "All",
      record: query.rows,
    };

    let resp = ResponseTemplate(0, "Get History Berhasil", data);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {
  Balence,
  TopUp,
  Transaction,
  TransactionHistory,
};
