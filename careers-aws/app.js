import express from "express";
import { router as careerRouter } from "./routes/careers.route.js";

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
app.use("/career", careerRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Careers!");
});
export { app };
