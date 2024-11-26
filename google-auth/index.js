import dotenv from "dotenv";
import { app } from "./app.js";

// env configuration
dotenv.config({
  path: "./.env",
});

app.listen(process.env.PORT, () => {
  console.log(`server is live at: http://localhost:${process.env.PORT}`);
});
