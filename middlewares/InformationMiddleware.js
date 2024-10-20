const { ResponseTemplate } = require("../helpers/templateHelper");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

async function Auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      let resp = ResponseTemplate(
        108,
        "Token tidak tidak valid atau kadaluwarsa",
        null
      );
      res.status(401).json(resp);
      return;
    }

    const token = authorization.split(" ")[1];

    const user = await jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;

    next();
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", null);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {
  Auth,
};
