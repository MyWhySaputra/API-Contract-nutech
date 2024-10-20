const express = require("express");
const router = express.Router();
const { Banner, Service } = require("../../controllers/InformationController");
const { Auth } = require("../../middlewares/InformationMiddleware");

/**
 * @swagger
 * /api/v1/banner:
 *   get:
 *     tags:
 *      - "Module Information"
 *     description: |
 *       **API Banner Public (tidak memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan list banner
 *
 *       *Ketentuan :*
 *       1. Buat data list banner sesuai dokumentasi Response dibawah, usahakan banner ini tidak di hardcode, melainkan ambil dari database
 *       2. Tidak perlu membuatkan module CRUD banner
 *       3. Handling Response sesuai dokumentasi Response dibawah
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
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       banner_name:
 *                         type: string
 *                         example: "Banner 1"
 *                       banner_image:
 *                         type: string
 *                         example: "https://nutech-integrasi.app/dummy.jpg"
 *                       description:
 *                         type: string
 *                         example: "Lerem Ipsum Dolor sit amet"
 *             example:
 *               status: 0
 *               message: "Sukses"
 *               data:
 *                 - banner_name: "Banner 1"
 *                   banner_image: "https://nutech-integrasi.app/dummy.jpg"
 *                   description: "Lerem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 2"
 *                   banner_image: "https://nutech-integrasi.app/dummy.jpg"
 *                   description: "Lerem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 3"
 *                   banner_image: "https://nutech-integrasi.app/dummy.jpg"
 *                   description: "Lerem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 4"
 *                   banner_image: "https://nutech-integrasi.app/dummy.jpg"
 *                   description: "Lerem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 5"
 *                   banner_image: "https://nutech-integrasi.app/dummy.jpg"
 *                   description: "Lerem Ipsum Dolor sit amet"
 *                 - banner_name: "Banner 6"
 *                   banner_image: "https://nutech-integrasi.app/dummy.jpg"
 *                   description: "Lerem Ipsum Dolor sit amet"
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
 */
router.get("/banner", Banner);
/**
 * @swagger
 * /api/v1/services:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Module Information"
 *     description: |
 *       **API Services Private (memerlukan Token untuk mengaksesnya)**
 *
 *       Digunakan untuk mendapatkan list Service/Layanan PPOB
 *
 *       *Ketentuan :*
 *       1. Buat data list Service/Layanan sesuai dokumentasi Response dibawah, usahakan data list **Service** atau **Layanan** ini tidak di hardcode, melainkan ambil dari database
 *       2. Tidak perlu membuatkan module CRUD Service/Layanan
 *       3. Handling Response sesuai dokumentasi Response dibawah
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
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       service_code:
 *                         type: string
 *                         example: "PAJAK"
 *                       service_name:
 *                         type: string
 *                         example: "Pajak PBB"
 *                       service_icon:
 *                         type: string
 *                         example: "https://nutech-integrasi.app/dummy.jpg"
 *                       service_tariff:
 *                         type: integer
 *                         example: 40000
 *             example:
 *               status: 0
 *               message: "Sukses"
 *               data:
 *                 - service_code: "PAJAK"
 *                   service_name: "Pajak PBB"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 40000
 *                 - service_code: "PLN"
 *                   service_name: "Listrik"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 10000
 *                 - service_code: "PDAM"
 *                   service_name: "PDAM Berlangganan"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 40000
 *                 - service_code: "PULSA"
 *                   service_name: "Pulsa"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 40000
 *                 - service_code: "PGN"
 *                   service_name: "PGN Berlangganan"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 50000
 *                 - service_code: "MUSIK"
 *                   service_name: "Musik Berlangganan"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 50000
 *                 - service_code: "TV"
 *                   service_name: "TV Berlangganan"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 50000
 *                 - service_code: "PAKET_DATA"
 *                   service_name: "Paket data"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 50000
 *                 - service_code: "VOUCHER_GAME"
 *                   service_name: "Voucher Game"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 100000
 *                 - service_code: "VOUCHER_MAKANAN"
 *                   service_name: "Voucher Makanan"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 100000
 *                 - service_code: "QURBAN"
 *                   service_name: "Qurban"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 200000
 *                 - service_code: "ZAKAT"
 *                   service_name: "Zakat"
 *                   service_icon: "https://nutech-integrasi.app/dummy.jpg"
 *                   service_tariff: 300000
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
 */
router.get("/services", Auth, Service);

module.exports = router;
