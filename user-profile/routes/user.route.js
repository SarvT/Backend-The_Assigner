import { Router } from "express";
import { createUser, getUser, getUsers } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/findall").get(getUsers);
router.route("/find").post(getUser);
router
  .route("/sign-up")
  .post(upload.single("avatar"), createUser);

export { router };
