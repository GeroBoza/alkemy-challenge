const express = require("express");
const router = express.Router();
const operationsTypesApiController = require("../../controllers/operationsTypesApiController");

router.get("/", operationsTypesApiController.getAllTypes);

module.exports = router;
