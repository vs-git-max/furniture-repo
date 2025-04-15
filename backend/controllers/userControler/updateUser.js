import { v2 as cloudinary } from "cloudinary";
import User from "../../models/user.models.js";
import { comparePassword } from "../../utils/password.js";

const updateUser = async (req, res) => {
  const { email, currentPassword, newPassword, name } = req.body;
  const userId = req.user.id;
  let { profileImage } = req.body;
  try {
    let user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: "User not found" });

    if (
      [currentPassword, newPassword].some(
        (password) => !password || password.trim() === ""
      )
    )
      return res.status(400).json({
        error:
          "Please add both the current password and the new password fields",
      });

    if (currentPassword && newPassword) {
      const isMatch = await comparePassword(currentPassword, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: "The current password in not correct" });

      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ message: "Password should be greater than 6" });
    }

    if (profileImage) {
      if (user.profileImage) {
        await cloudinary.destroy(
          user.profileImage.split("/").pop().split(".")[0]
        );
      }
      const uploadedImage = await cloudinary.uploader.upload(profileImage);
      profileImage = uploadedImage.secure_url;
    }

    (user.name = name || user.name), (user.email = email || user.email);
    user.profileImage = profileImage || user.profileImage;

    user = await user.save();
    user.password = null;

    res.status(200).json(user);
  } catch (error) {
    console.log("Error on the updateUser controler", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default updateUser;
