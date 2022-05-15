const express = require("express");
const router = express.Router();
const usersApiController = require("../../controllers/usersApiController");

router.post("/login", usersApiController.login);
router.post("/register", usersApiController.register);

module.exports = router;
