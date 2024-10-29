const express = require("express");
const router = express.Router();
const { Balence, TopUp, Transaction, TransactionHistory } = require("../../controllers/TransactionController");
const { Auth, MiddTopup } = require("../../middlewares/TransactionMiddleware");

/**
 * @swagger
 * /api/v1/balence:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Module Transaction"
 *     description: |
 *       **API Balance Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User
 *
 *       *Ketentuan :*
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Handling Response sesuai dokumentasi Response dibawah
 *     responses:
 *       200:
 *         description: Get Balance / Saldo Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Get Balance Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *                       example: 1000000
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak tidak valid atau kadaluwarsa
 *                 data:
 *                   type: object
 *                   example: null
 *       500:
 *          description: Internal Server Error
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: internal server error
 *                 data:
 *                   type: object
 */
router.get("/balence", Auth, Balence);
/**
 * @swagger
 * /api/v1/topup:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Module Transaction"
 *     description: |
 *       **API Topup Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan top up balance / saldo dari User
 *
 *       *Ketentuan :*
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Setiap kali melakukan Top Up maka balance / saldo dari User otomatis bertambah
 *       4. Parameter amount hanya boleh angka saja dan tidak boleh lebih kecil dari 0
 *       5. Pada saat Top Up set transaction_type di database menjadi **TOPUP**
 *       6. Handling Response sesuai dokumentasi Response dibawah
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                top_up_amount:
 *                  type: integer
 *                  example: 1000000
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Top Up Balance berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *                       example: 2000000
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *             examples:
 *               amountNotValid:
 *                 summary: Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0
 *                 value:
 *                   status: 102
 *                   message: Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0
 *                   data: null
 *               topUpNotNumber:
 *                 summary: \"top_up_amount\" must be a number
 *                 value:
 *                   status: 102
 *                   message: \"top_up_amount\" must be a number
 *                   data: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak tidak valid atau kadaluwarsa
 *                 data:
 *                   type: object
 *                   example: null
 *       500:
 *          description: Internal Server Error
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: internal server error
 *                 data:
 *                   type: object
 */
router.post("/topup", Auth, MiddTopup, TopUp);
/**
 * @swagger
 * /api/v1/transaction:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Module Transaction"
 *     description: |
 *       **API Transaction Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan transaksi dari services / layanan yang tersedia
 *
 *       *Ketentuan :*
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Setiap kali melakukan Transaksi harus dipastikan balance / saldo mencukupi
 *       4. Pada saat Transaction set transaction_type di database menjadi **PAYMENT**
 *       5. Handling Response sesuai dokumentasi Response dibawah
 *       6. Response **invoice_number** untuk formatnya generate bebas
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                service_code:
 *                  type: string
 *                  example: PULSA
 *     responses:
 *       200:
 *         description: Transaksi Berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Transaksi berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     invoice_number:
 *                       type: string
 *                       example: INV17082023-001
 *                     service_code:
 *                       type: string
 *                       example: PLN_PRABAYAR
 *                     service_name:
 *                       type: string
 *                       example: PLN Prabayar
 *                     transaction_type:
 *                       type: string
 *                       example: PAYMENT
 *                     total_amount:
 *                       type: integer
 *                       example: 10000
 *                     created_on:
 *                       type: string
 *                       example: 2023-08-17T10:10:10.000Z
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Service ataus Layanan tidak ditemukan
 *                 data:
 *                   type: object
 *                   example: null
 *             examples:
 *               ServiceNotFound:
 *                 summary: Layanan Tidak Ditemukan
 *                 value:
 *                   status: 102
 *                   message: Service ataus Layanan tidak ditemukan
 *                   data: null
 *               BalanceNotEnough:
 *                 summary: Saldo Tidak Cukup
 *                 value:
 *                   status: 102
 *                   message: Saldo anda tidak mencukupi
 *                   data: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak tidak valid atau kadaluwarsa
 *                 data:
 *                   type: object
 *                   example: null
 *       500:
 *          description: Internal Server Error
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: internal server error
 *                 data:
 *                   type: object
 */
router.post("/transaction", Auth, Transaction);
/**
 * @swagger
 * /api/v1/transaction/history:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Module Transaction"
 *     description: |
 *       **API History Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan informasi history transaksi
 *
 *       *Ketentuan :*
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Terdapat parameter limit yang bersifat **opsional**, jika limit tidak dikirim maka tampilkan semua data
 *       4. Data di order dari yang paling baru berdasarkan transaction date (created_on)
 *       5. Handling Response sesuai dokumentasi Response dibawah
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: false
 *         description: Limit jumlah data history transaksi yang ditampilkan
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         required: false
 *         description: Offset data history transaksi
 *     responses:
 *       200:
 *         description: Get History Transaksi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Get History Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     offset:
 *                       type: integer
 *                       example: 0
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           invoice_number:
 *                             type: string
 *                             example: "INV17082023-001"
 *                           transaction_type:
 *                             type: string
 *                             example: "TOPUP"
 *                           description:
 *                             type: string
 *                             example: "Top Up balance"
 *                           total_amount:
 *                             type: integer
 *                             example: 100000
 *                           created_on:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-08-17T10:10:10.000Z"
 *             example:
 *               status: 0
 *               message: "Get History Berhasil"
 *               data:
 *                 offset: 0
 *                 limit: 3
 *                 records:
 *                   - invoice_number: "INV17082023-001"
 *                     transaction_type: "TOPUP"
 *                     description: "Top Up balance"
 *                     total_amount: 100000
 *                     created_on: "2023-08-17T10:10:10.000Z"
 *                   - invoice_number: "INV17082023-002"
 *                     transaction_type: "PAYMENT"
 *                     description: "PLN Pascabayar"
 *                     total_amount: 10000
 *                     created_on: "2023-08-17T11:10:10.000Z"
 *                   - invoice_number: "INV17082023-003"
 *                     transaction_type: "PAYMENT"
 *                     description: "Pulsa Indosat"
 *                     total_amount: 40000
 *                     created_on: "2023-08-17T12:10:10.000Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak valid atau kadaluwarsa
 *                 data:
 *                   type: object
 *                   example: null
 *       500:
 *          description: Internal Server Error
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: internal server error
 *                 data:
 *                   type: object
 */
router.get("/transaction/history", Auth, TransactionHistory);

module.exports = router;
