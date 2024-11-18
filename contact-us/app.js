import express from "express";
import { router as contactRoutes } from "./routes/contact.route.js";

const app = express();

app.use(express.json());

app.use(contactRoutes);

export { app };
