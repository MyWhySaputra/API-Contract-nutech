const express = require("express");
const router = express.Router();
const multer = require("multer")();
const { Registration, Login, Profile, Update, UpdateImage } = require("../../controllers/MembershipController");
const { Auth, MiddRegis, MiddLogin, FileValidation } = require("../../middlewares/MembershipMiddleware");

/**
 * @swagger
 * /api/v1/registration:
 *   post:
 *     tags:
 *      - "Module Membership"
 *     description: |
 *       **API Registration Public (Tidak perlu Token untuk mengaksesnya)**
 * 
 *       Digunakan untuk melakukan registrasi User agar bisa Login kedalam aplikasi
 * 
 *       *Ketentuan :*
 *       1. Parameter request **email** harus terdapat validasi format email
 *       2. Parameter request **password** harus terdapat validasi minimal 8 karakter
 *       3. Handling Response sesuai dokumentasi Response dibawah
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                password:
 *                  type: string
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
 *                   example: Registrasi berhasil silahkan login
 *                 data:
 *                   type: object
 *                   example: null
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
 *               emailNotValid:
 *                 summary: Format Email Tidak Sesuai
 *                 value:
 *                   status: 102
 *                   message: \email\ must be a valid email
 *                   data: null
 *               passwordNotValid:
 *                 summary: Password Tidak Sesuai
 *                 value:
 *                   status: 102
 *                   message: \password\ length must be at least 8 characters long
 *                   data: null
 *       404:
 *         description: Email already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Email already exist
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
router.post("/registration", MiddRegis, Registration);
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *      - "Module Membership"
 *     description: |
 *       **API Login Public (Tidak perlu Token untuk mengaksesnya)**
 *
 *       Digunakan untuk melakukan login dan mendapatkan authentication berupa JWT (Json Web Token)
 * 
 *       *Ketentuan :*
 *       1. Parameter request **email** harus terdapat validasi format email
 *       2. Parameter request **password** Length minimal 8 karakter
 *       3. **JWT** yang digenerate harus memuat payload **email** dan di set **expiration** selama 12 jam dari waktu di generate
 *       4. Handling Response sesuai dokumentasi Response dibawah
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Berhasil Login
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
 *                   example: Login Sukses
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNTRVdXRjYTdCS0ZPX0ZUZGZ1bXlJem9zSTRKa1VxUGZVZ0ROSTUwelRTQlo2aHoyY0hKZ1VMb1loM09HUUd0ekQxV3dTX194aHBNZTE2SGFscVRzcEhjS21UclJ3S2FYYmZob3AzdzFFUHJ2NFdBQmk1c0RpdV9DSnZTSWt2MDFTbEU0QU5pbVB0bUx5azZoUzlOalVQNEZaVVpfRVBtcEk4Y3pNc3ZWa2JFPSIsImlhdCI6MTYyNjkyODk3MSwiZXhwIjoyNTU2MTE4Nzk4fQ.9C9NvhZYKivhGWnrjo4Wr1Rv-wur1wCm0jqfK9XDD8U
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
 *                   example: Paramter email tidak sesuai format
 *                 data:
 *                   type: object
 *                   example: null
 *       401:
 *         description: Unauthorized
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
 *               emailNotFound:
 *                 summary: Email Tidak Ditemukan
 *                 value:
 *                   status: 103
 *                   message: email not found
 *                   data: null
 *               passwordNotValid:
 *                 summary: Password Tidak Sesuai
 *                 value:
 *                   status: 103
 *                   message: password is not correct
 *                   data: null
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
router.post("/login", MiddLogin, Login);
/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Module Membership"
 *     description: |
 *       **API Profile Private (memerlukan Token untuk mengaksesnya)**
 * 
 *       Digunakan untuk mendapatkan informasi profile User
 * 
 *       *Ketentuan :*
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
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
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@nutech-integrasi.com
 *                     first_name:
 *                       type: string
 *                       example: User
 *                     last_name:
 *                       type: string
 *                       example: Nutech
 *                     profile_image:
 *                       type: string
 *                       example: https://yoururlapi.com/profile.jpeg
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
router.get("/profile", Auth, Profile);
/**
 * @swagger
 * /api/v1/profile/update:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Module Membership"
 *     description: |
 *       **API Update Profile Private (memerlukan Token untuk mengaksesnya)**
 * 
 *       Digunakan untuk mengupdate data profile User
 *       
 *       *Ketentuan :*
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Handling Response sesuai dokumentasi Response dibawah
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
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
 *                   example: Update Pofile berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@nutech-integrasi.com
 *                     first_name:
 *                       type: string
 *                       example: User Edited
 *                     last_name:
 *                       type: string
 *                       example: Nutech Edited
 *                     profile_image:
 *                       type: string
 *                       example: https://yoururlapi.com/profile.jpeg
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
router.put("/profile/update", Auth, Update);
/**
 * @swagger
 * /api/v1/profile/image:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Module Membership"
 *     description: |
 *       **API Upload Profile Image Private (memerlukan Token untuk mengaksesnya)**
 * 
 *       Digunakan untuk mengupdate / upload profile image User
 * 
 *       *Ketentuan :*
 *       1. Service ini harus menggunakan **Bearer Token JWT** untuk mengaksesnya
 *       2. Tidak ada parameter email di query param url ataupun request body, parameter email diambil dari payload JWT yang didapatkan dari hasil login
 *       3. Format Image yang boleh di upload hanya **jpeg** dan **png**
 *       4. Handling Response sesuai dokumentasi Response dibawah
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                file:
 *                  type: string
 *                  format: binary
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
 *                   example: Update Profile Image berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@nutech-integrasi.com
 *                     first_name:
 *                       type: string
 *                       example: User Edited
 *                     last_name:
 *                       type: string
 *                       example: Nutech Edited
 *                     profile_image:
 *                       type: string
 *                       example: https://yoururlapi.com/profile-updated.jpeg
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
 *                   example: Format Image tidak sesuai
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
router.put("/profile/image", Auth, multer.single("file"), FileValidation, UpdateImage);

module.exports = router;
