// Imports
import express from "express";
import cors from "cors";
import { LOCALHOST_SERVER_PORT } from "./configs/envConfig.js";
import connectDb from "./configs/dbConfig.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed URLs to make requests from server
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.listen(LOCALHOST_SERVER_PORT, (req, res) => {
  connectDb();
  console.log(`Server listening on port ${LOCALHOST_SERVER_PORT}`);
});
