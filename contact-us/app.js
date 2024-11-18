import express from "express";
import { router as contactRoutes } from "./routes/contact.route.js";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use(contactRoutes);

export { app };
