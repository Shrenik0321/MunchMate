import Users from "../models/user.model.js";
import generateToken from "../utils/generateToken.util.js";
import bcrypt from "bcrypt";

export const userSignInController = async (req, res) => {
  try {
    const userToSignIn = { ...req.body };

    // Check if user already exists.
    const user = await Users.findOne({ email: userToSignIn.email });

    if (!user) {
      return res.status(401).json({
        message: "Email doesn't exist, Sign Up.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      userToSignIn.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Generate jwt access token
    const token = generateToken(user._id);
    res.cookie("accessToken", token, {
      withCredentials: true,
      httpOnly: false,
    });

    return res.status(200).json({
      message: "User sign in successful.",
      user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};
