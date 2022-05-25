const express = require("express");
const router = express.Router();
const operationsApiController = require("../../controllers/operationsApiController");
// const verifyJWT = require("../../middlewares/verifyJWT");

router.get("/", operationsApiController.getAllOperations);
router.get("/lastTen", operationsApiController.getLastTenOperations);
router.get("/balance", operationsApiController.getActualBalance);

router.get("/type/:id", operationsApiController.getOperationsByType);
router.get("/category/:id", operationsApiController.getOperationsByCategory);

router.get("/:id", operationsApiController.getOperation);

// CRUD
router.post("/new", operationsApiController.newOperation);
router.post("/edit", operationsApiController.editOperation);
router.post("/delete", operationsApiController.deleteOperation);

module.exports = router;
