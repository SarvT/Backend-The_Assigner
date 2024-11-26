import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { getCandidateByEmail, submitForm } from "../controller/careers.controller.js";

const router = Router();

router.route("/submit").post(upload.single("resume"), submitForm);
router.route("/get-info").get(getCandidateByEmail);

export { router };
  