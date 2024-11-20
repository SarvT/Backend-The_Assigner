import { Router } from "express";
import {
  changeUserPassword,
  getCurrUser,
  login,
  logoutUser,
  refreshAccToken,
  register,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/logout").post(verifyToken, logoutUser);
router.route("/refresh-tkn").post(refreshAccToken);
router.route("/change-password").post(verifyToken, changeUserPassword);
router.route("/curr-user").get(verifyToken, getCurrUser);

export { router };
