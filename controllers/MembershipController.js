const { ComparePassword, HashPassword } = require("../helpers/hashPassHelper");
const { ResponseTemplate } = require("../helpers/templateHelper");
const pool = require("../database/db");

var imagekit = require("../lib/imagekit");
var jwt = require("jsonwebtoken");

async function Registration(req, res) {
  const client = await pool.connect();
  try {
    const { email, first_name, last_name, password } = req.body;

    const hashPass = await HashPassword(password);

    const queryEmail = await client.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (queryEmail.rows.length > 0) {
      let resp = ResponseTemplate(404, "Email already exist", null);
      res.status(404).json(resp);
      return;
    }

    const queryCreate = await client.query(
      "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)",
      [email, first_name, last_name, hashPass]
    );

    if (queryCreate) {
      let resp = ResponseTemplate(
        0,
        "Registrasi berhasil silahkan login",
        null
      );
      res.status(200).json(resp);
      return;
    }
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  } finally {
    client.release();
  }
}
async function Login(req, res) {
  const client = await pool.connect();
  try {
    const { email, password } = req.body;

    const checkUser = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkUser.rows.length === 0) {
      let resp = ResponseTemplate(0, "email not found", null);
      res.status(400).json(resp);
      return;
    }

    const checkPassword = await ComparePassword(
      password,
      checkUser.rows[0].password
    );

    if (!checkPassword) {
      let resp = ResponseTemplate(0, "password is not correct", null);
      res.status(400).json(resp);
      return;
    }

    const token = jwt.sign(
      {
        email: checkUser.rows[0].email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "12h" }
    );

    const data = {
      token: token,
    };

    let resp = ResponseTemplate(0, "Login Sukses", data);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  } finally {
    client.release();
  }
}
async function Profile(req, res) {
  const client = await pool.connect();
  try {
    const userEmail = req.user.email;

    const query = await client.query("SELECT * FROM users WHERE email = $1", [
      userEmail,
    ]);

    if (query.rows.length === 0) {
      let resp = ResponseTemplate(0, "user not found", null);
      res.status(400).json(resp);
      return;
    }

    const data = {
      email: query.rows[0].email,
      first_name: query.rows[0].first_name,
      last_name: query.rows[0].last_name,
      profile_image: query.rows[0].profile_image,
    };

    let resp = ResponseTemplate(0, "Sukses", data);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  } finally {
    client.release();
  }
}
async function Update(req, res) {
  const client = await pool.connect();
  try {
    const userEmail = req.user.email;

    const { first_name, last_name } = req.body;

    const query = await client.query(
      "UPDATE users SET first_name = $1, last_name = $2 WHERE email = $3",
      [first_name, last_name, userEmail]
    );

    const checkUser = await client.query("SELECT * FROM users WHERE email = $1", [
      userEmail,
    ]);

    const data = {
      email: checkUser.rows[0].email,
      first_name: checkUser.rows[0].first_name,
      last_name: checkUser.rows[0].last_name,
      profile_image: checkUser.rows[0].profile_image,
    };

    if (query) {
      let resp = ResponseTemplate(0, "Update Pofile berhasil", data);
      res.status(200).json(resp);
      return;
    }
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  } finally {
    client.release();
  }
}
async function UpdateImage(req, res) {
  const client = await pool.connect();
  try {
    const userEmail = req.user.email;

    const stringFile = req.file.buffer.toString("base64");

    const uploadFile = await imagekit.upload({
      fileName: req.file.originalname,
      file: stringFile,
    });

    const query = await client.query(
      "UPDATE users SET profile_image = $1 WHERE email = $2",
      [uploadFile.url, userEmail]
    );

    const checkUser = await client.query("SELECT * FROM users WHERE email = $1", [
      userEmail,
    ]);

    const data = {
      email: checkUser.rows[0].email,
      first_name: checkUser.rows[0].first_name,
      last_name: checkUser.rows[0].last_name,
      profile_image: checkUser.rows[0].profile_image,
    };

    if (query) {
      let resp = ResponseTemplate(0, "Update Profile Image berhasil", data);
      res.status(200).json(resp);
      return;
    }
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  } finally {
    client.release();
  }
}

module.exports = {
  Registration,
  Login,
  Profile,
  Update,
  UpdateImage,
};
