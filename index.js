require("dotenv").config();
const express = require("express");
const router = require("./routes/routes");
const swaggerUi = require("swagger-ui-express");
const swagger = require("./helpers/swaggerHelper");

const app = express();

app.use(express.json());

app.use("/", router);
app.use("/docs", swaggerUi.serve, swagger);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

