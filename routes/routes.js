const express = require("express");
const membershipRouteV1 = require("./v1/MembershipRoute");
const informationRouteV1 = require("./v1/InformationRoute");
const transactionRouteV1 = require("./v1/TransactionRoute");
const morgan = require("morgan");

// version 1
const v1 = express.Router();
v1.use(morgan("dev"));
v1.use("/", [membershipRouteV1, informationRouteV1, transactionRouteV1]);

const router = express.Router();
router.use("/api/v1", v1);

// default version
router.use("/api", v1);

module.exports = router;
