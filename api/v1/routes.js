const express = require("express");
const router = express.Router();

const AuthenticationController = require("../../controller/AuthenticationController");

// AUTHENTICATION ROUTES
// Only send token with id back and redirect in client to /users/:id to load users data
router.post("/register", AuthenticationController.register);
router.post("/login", AuthenticationController.login);

module.exports = router;
