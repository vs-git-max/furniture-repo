import User from "../../models/user.models.js";
import generateTokenAndSetCookie from "../../utils/generateCookies.js";
import { hashPassword } from "../../utils/password.js";

const signup = async (req, res) => {
  const { email, password, name, profileImage } = req.body;

  try {
    //testing the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status().json({ message: "Email format invalid" });
    }

    //checking if the email is available in the db
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already taken" });

    //working on the password
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password length should be greater than 6" });

    //hashing the password
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      email,
      name,
      profileImage,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser.id, res);
      await newUser.save();

      res.status(201).json({
        name: newUser.name,
        profileImage: newUser.profileImage,
        email: newUser.email,
      });
    } else {
      res.status(500).json({ error: "invalid user details" });
    }
  } catch (error) {
    console.log(`Error in the signup controller ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};

export default signup;
