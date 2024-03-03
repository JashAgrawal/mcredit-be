require("dotenv").config();
import { connectDB } from "./config/mongo";
import express from "express";
import Datarouter from "./router";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json());
app.use(Datarouter);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
