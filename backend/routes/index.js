var express = require("express");
var router = express.Router();
const userApiRouter = require("./api/users");
const operationsApiRouter = require("./api/operations");
const operationsCategoriesApiRouter = require("./api/operationsCategories");

// Users API routes
router.use("/users", userApiRouter);

// Operations API routes
router.use("/operations", operationsApiRouter);

// Operations Categories API routes
router.use("/categories", operationsCategoriesApiRouter);

module.exports = router;
