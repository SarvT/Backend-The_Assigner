import { Router } from "express";
import { getForms, sendForm } from "../controller/form.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/fetch-all").get(getForms);
router.route("/send").post(verifyToken, sendForm);

export { router };
