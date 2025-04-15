import User from "../../models/user.models.js";
import generateTokenAndSetCookie from "../../utils/generateCookies.js";
import { comparePassword } from "../../utils/password.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((item) => !item || item.trim() === ""))
      return res
        .status(400)
        .json({ message: "Please add both the email and password fields" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (typeof password !== "string") {
      return res.status(403).json({ error: "Wrong password input" });
    }

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password not correct" });
    }

    generateTokenAndSetCookie(user.id, res);

    res.status(200).json({
      id: user.id,
      name: user.name,
      profileImage: user.profileImage,
      email: user.email,
    });
  } catch (error) {
    console.log(`Error in the log in controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default login;
