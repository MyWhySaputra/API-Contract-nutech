const { ResponseTemplate } = require("../helpers/templateHelper");
const pool = require("../database/db");

async function Banner(req, res) {
  try {
    const query = await pool.query(
      "SELECT banner_name, banner_image, description FROM banners"
    );

    if (query.rows.length === 0) {
      let resp = ResponseTemplate(0, "banner not found", null);
      res.status(400).json(resp);
      return;
    }

    let resp = ResponseTemplate(0, "Sukses", query.rows);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  }
}
async function Service(req, res) {
  try {
    const query = await pool.query(
      "SELECT service_code, service_name, service_icon, service_tarif FROM services"
    );

    if (query.rows.length === 0) {
      let resp = ResponseTemplate(0, "service not found", null);
      res.status(400).json(resp);
      return;
    }

    let resp = ResponseTemplate(0, "Sukses", query.rows);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(500, "internal server error", error);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {
  Banner,
  Service,
};