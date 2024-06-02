import Users from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../configs/envConfig.js";

// Middleware to require authentication for protected routes
export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token not available.", status: false });
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN);

    if (decoded.exp && Date.now() > decoded.exp * 1000) {
      return res
        .status(401)
        .json({ error: "Token expired, please log in again" });
    }

    const user = await Users.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token signature" });
    } else {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
