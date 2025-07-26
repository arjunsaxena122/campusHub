import { Router } from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller";
import { authVerifyJwt } from "../middlewares/auth.middleware";

const router: Router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(authVerifyJwt, logout);
router.route("/get-me").post(authVerifyJwt, getMe);

export default router;
