import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import updateUser from "../controllers/userControler/updateUser.js";

const router = express.Router();
router.post("/update", protectRoute, updateUser);

export default router;
