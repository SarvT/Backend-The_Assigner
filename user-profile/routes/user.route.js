import { Router } from "express";
import { createUser, getUsers } from "../controller/user2.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUsers);
router
  .route("/sign-up")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), createUser);

export { router };
