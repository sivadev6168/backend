import express from "express";
import cors from "cors";
import "./db/db.js";
import router from "./routes/index.js";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use(router);

app.use("*", (req, res) => {
  res.status(404).json({ message: "route not found" });
});
app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server running @ 5000");
});
