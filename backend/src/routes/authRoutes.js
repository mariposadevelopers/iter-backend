import { Router } from "express";
import { login, logout, verifyToken } from "../controllers/authController.js";
import {authRequired} from "../middlewares/validateToken.js"
const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get("/verify", authRequired, verifyToken ); 
export default router;
