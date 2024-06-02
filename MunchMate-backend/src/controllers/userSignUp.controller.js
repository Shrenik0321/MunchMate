import Users from "../models/user.model.js";
import generateToken from "../utils/generateToken.util.js";
import bcrypt from "bcrypt";

export const userSignUpController = async (req, res) => {
  try {
    const userToSignUp = { ...req.body };

    // Check if user already exists.
    const existingUser = await Users.findOne({ email: userToSignUp.email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists." });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(userToSignUp.password, 10);

    const newUserToSignUp = {
      ...userToSignUp,
      password: hashedPassword,
    };

    // Create new user in db.
    const user = await Users.create(newUserToSignUp);

    // Generate jwt access token
    const token = generateToken(user._id);
    res.cookie("accessToken", token, {
      withCredentials: true,
      httpOnly: false,
    });

    return res.status(201).json({ message: "User sign up successful.", user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};
