import express = require("express");
const authController = require("../controllers/auth");
import jwt = require("jsonwebtoken");

const router = express.Router();
router.post('/login', authController.login);
export = router;