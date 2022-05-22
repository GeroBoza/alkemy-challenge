const express = require("express");
const router = express.Router();
const operationsApiController = require("../../controllers/operationsApiController");

router.get("/", operationsApiController.getAllOperations);
router.get("/lastTen", operationsApiController.getLastTenOperations);
router.get("/balance", operationsApiController.getActualBalance);

router.get("/types", operationsApiController.getOperationsTypes);
router.get("/type/:id", operationsApiController.getOperationsByType);
router.get("/category/:id", operationsApiController.getOperationsByCategory);

router.get("/:id", operationsApiController.getOperation);

router.post("/new", operationsApiController.newOperation);
router.post("/delete", operationsApiController.deleteOperation);

module.exports = router;
