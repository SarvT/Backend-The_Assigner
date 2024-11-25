import { Router } from "express";
import passport from "passport";
import {
  failureRedirect,
  successRedirect,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.route("/fb").get(
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.route("/google/cb").get(
  passport.authenticate("google", {
    successRedirect: "/auth/cb/success",
    failureRedirect: "/auth/cb/fail",
  })
);

router.route("/fb/cb").get(
  passport.authenticate("facebook", {
    successRedirect: "/auth/cb/success",
    failureRedirect: "/auth/cb/fail",
  })
);

router.route("/cb/success").get(successRedirect);
router.route("/cb/fail").get(failureRedirect);

export { router };
