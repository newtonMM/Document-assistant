import { Router } from "express";
import { signup, login, logout } from "../controllers/user";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", isAuth, logout);

export default router;
