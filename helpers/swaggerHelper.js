const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css";

swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Contract SIMS PPOB",
      version: "1.0.0",
      description: "Documentation for Take Home Test API",
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./routes/v1/MembershipRoute.js",
    "./routes/v1/InformationRoute.js",
    "./routes/v1/TransactionRoute.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
  customCssUrl: CSS_URL,
};

module.exports = swaggerUi.setup(swaggerDocs, options);
