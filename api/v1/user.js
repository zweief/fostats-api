const express = require("express");
const router = express.Router();

const UserController = require("../../controller/UserController");
const { isAuthenticated } = require("../../middleware/");

router.get("/users", UserController.index);
router.get("/users/:user_id", isAuthenticated, UserController.show);
router.delete("/users/:user_id", isAuthenticated, UserController.destroy);
router.put("/users/:user_id", isAuthenticated, UserController.update);

module.exports = router;
