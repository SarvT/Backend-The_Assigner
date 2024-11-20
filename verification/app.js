import express from "express";
import { router as formRouter } from "./routes/form.route.js";
import { router as userRouter } from "./routes/user.route.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser()); 
app.use("/form", formRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome for verification!");
});
export { app };
