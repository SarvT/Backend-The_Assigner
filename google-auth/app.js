import express from "express";
import passport from "passport";
import "./passport.js";
import { router as userRouter } from "./routes/user.route.js";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(
  session({
    secret: process.env.KEY_1,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// adding suppport for initialize and support
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", userRouter);

// default endpoint
app.get("/", (req, res) => {
  res.send(
    "Welcome for verification! <br> <button><a href='/auth/google'>Login With Google</a></button> <br> Welcome for verification! <br> <button><a href='/auth/fb'>Login With Facebook</a></button>"
  );
});

export { app };
