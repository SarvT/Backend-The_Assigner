import express from "express";
import { router as userRoutes } from "../user-profile/routes/user.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/user", userRoutes);

export { app };
