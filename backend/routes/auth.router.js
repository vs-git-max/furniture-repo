import express from "express";
import signup from "../controllers/authControlers/signup.contoller.js";
import login from "../controllers/authControlers/login.controller.js";
import logout from "../controllers/authControlers/logout.controller.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
