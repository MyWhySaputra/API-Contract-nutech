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

async function MiddRegisLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(102, error.details[0].message, null);
    res.status(400).json(resp);
    return;
  }
  next();
}

async function FileValidation(req, res, next) {
  if (!req.file) {
    let resp = ResponseTemplate(102, "File is required", null);
    res.status(400).json(resp);
    return;
  }

  const schema = Joi.object({
    mimetype: Joi.string()
      .valid("image/jpeg", "image/jpg", "image/png")
      .required(),
  });

  const { error } = schema.validate({ mimetype: req.file.mimetype });

  if (error) {
    let resp = ResponseTemplate(102, "Format Image tidak sesuai", null);
    res.status(400).json(resp);
    return;
  }

  next();
}

module.exports = {
  Auth,
  MiddRegisLogin,
  FileValidation,
};
