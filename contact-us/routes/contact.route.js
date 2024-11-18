import { Router } from "express";
import { contactUs, getContactUs } from "../controllers/contact.controller.js";

const router = Router();


router.route("/").get(getContactUs); //home
router.route("/contact-us").post(contactUs); //send-msg

export { router };
