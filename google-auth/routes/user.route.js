import { Router } from "express";
import passport from "passport";
import {
  failureRedirect,
  successRedirect,
} from "../controllers/user.controller.js";

const router = Router();

// initialize google login screen
router.route("/google").get(
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// initialize facebook login screen
router.route("/fb").get(
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

// adding callback route for google
router.route("/google/cb").get(
  passport.authenticate("google", {
    successRedirect: "/auth/cb/success",
    failureRedirect: "/auth/cb/fail",
  })
);

// adding callback route for facebook
router.route("/fb/cb").get(
  passport.authenticate("facebook", {
    successRedirect: "/auth/cb/success",
    failureRedirect: "/auth/cb/fail",
  })
);

router.route("/cb/success").get(successRedirect); //req success
router.route("/cb/fail").get(failureRedirect); //req failure

export { router };
