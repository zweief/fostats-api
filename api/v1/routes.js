const express = require("express");
const router = express.Router();

const AuthenticationController = require("../../controller/AuthenticationController");
const UserController = require("../../controller/UserController");

const { isAuthenticated } = require("../../middleware/");

// AUTHENTICATION ROUTES
// Only send token with id back and redirect in client to /users/:id to load users data
router.post("/register", AuthenticationController.register);
router.post("/login", AuthenticationController.login);

// USER ROUTES
// only for development, no need to show all users in production
router.get("/users", UserController.index);
router.get("/users/:user_id", isAuthenticated, UserController.show);
router.delete("/users/:user_id", isAuthenticated, UserController.destroy);
router.put("/users/:user_id", isAuthenticated, UserController.update);

module.exports = router;
