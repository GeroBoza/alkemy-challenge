const express = require("express");
const router = express.Router();
const operationsCategoriesApiController = require("../../controllers/operationsCategoriesApiController");

router.get("/", operationsCategoriesApiController.getAllCategories);

router.post("/new", operationsCategoriesApiController.newCategory);

module.exports = router;
