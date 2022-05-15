var express = require("express");
var router = express.Router();
const userApiRouter = require("./api/users");
const operationsApiRouter = require("./api/operations");

// Users API routes
router.use("/users", userApiRouter);

// Operations API routes
router.use("/operations", operationsApiRouter);

module.exports = router;
