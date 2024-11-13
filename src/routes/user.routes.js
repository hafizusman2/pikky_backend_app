const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controller");

router.post("/register", authControllers.handleUserRegistration);

router.post("/login", authControllers.handleUserLogin);

module.exports = router;
