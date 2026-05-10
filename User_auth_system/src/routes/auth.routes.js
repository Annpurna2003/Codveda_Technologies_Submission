const express = require('express');
const authController = require('../controllers/auth.controllers.js');

const authRouter = express.Router();

// Routes
authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.delete("/logout", authController.logoutUser);

module.exports = authRouter;