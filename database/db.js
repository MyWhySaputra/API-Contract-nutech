const { Pool } = require("pg");

// Menggunakan string koneksi PostgreSQL langsung
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Uji koneksi ke database
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
