// Imports
import express from "express";
import cors from "cors";
import { LOCALHOST_SERVER_PORT } from "./configs/envConfig.js";
import connectDb from "./configs/dbConfig.js";
import auth from "./routes/auth.route.js";
import restaurant from "./routes/restaurant.route.js";
import cookieParser from "cookie-parser";
import { requireAuth } from "./middlewares/auth.middleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Defining Routes
app.use("/api/auth", auth);
app.use("/api/restaurants", restaurant);

app.listen(LOCALHOST_SERVER_PORT, (req, res) => {
  connectDb();
  console.log(`Server listening on port ${LOCALHOST_SERVER_PORT}`);
});
