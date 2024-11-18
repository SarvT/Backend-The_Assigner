import { Router } from "express";
import { contactUs, getContactUs } from "../controllers/contact.controller.js";

const router = Router();

router.route("/").get(getContactUs);
router.route("/contact-us").post(contactUs);

export { router };
