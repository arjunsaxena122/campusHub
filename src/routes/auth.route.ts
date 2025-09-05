import { Router } from "express";
import { apiKey, getMe, login, logout, register } from "../controllers/auth.controller";
import { authVerifyJwt } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { userApiKeyValidationSchema, userGetValidationSchema, userLoginValidationSchema, userLogoutValidationSchema, userRegisterValidationSchema } from "../validators/auth.validator";

const router: Router = Router();

router.route("/register").post(validate(userRegisterValidationSchema, ["body"]), register);
router.route("/login").post(validate(userLoginValidationSchema, ["body"]), login);
router.route("/logout").post(validate(userLogoutValidationSchema, ["params"]), authVerifyJwt, logout);
router.route("/get-me").post(validate(userGetValidationSchema, ["body"]), authVerifyJwt, getMe);
router.route("/api-key").post(validate(userApiKeyValidationSchema, ["body", "params"]), authVerifyJwt, apiKey);

export default router;
