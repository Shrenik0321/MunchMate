import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../configs/envConfig.js";

// Function to verify authentication and respond with user data
export const authVerifyController = async (req, res) => {
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
      .json({ error: "Token expired, please log in again." });
  }

  const user = await User.findById(decoded.userId);

  if (user) return res.status(200).json({ status: true, user });
  else
    return res.status(401).json({ message: "Invalid Token.", status: false });
};
