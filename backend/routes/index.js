var express = require("express");
var router = express.Router();
const userApiRouter = require("./api/users");
const operationsApiRouter = require("./api/operations");
const operationsCategoriesApiRouter = require("./api/operationsCategories");
const operationsTypesApiRouter = require("./api/operationsTypes");
const verifyJWT = require("../middlewares/verifyJWT");

// Users API routes
router.use("/users", userApiRouter);

// Operations API routes
router.use("/operations", verifyJWT, operationsApiRouter);

// Operations Types API routes
router.use("/types", operationsTypesApiRouter);

// Operations Categories API routes
router.use("/categories", verifyJWT, operationsCategoriesApiRouter);

module.exports = router;
