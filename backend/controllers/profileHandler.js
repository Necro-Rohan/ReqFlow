import user from "../models/user.js";
import { updateProfileSchema, updateEmailSchema } from "../validators/profileValidator.js";
import bcrypt from "bcryptjs";

export const updateProfile = async (req, res) => {
  try {
    const validatedData = updateProfileSchema.safeParse(req.body);
    console.log(validatedData);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ errors: validatedData.error.issues[0].message });
    }

    const existingUser = await user.findById(req.user.userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const finalData = {
      name: validatedData.data.name ?? existingUser.name,
      username: validatedData.data.username ?? existingUser.username,
      bio: validatedData.data.bio ?? existingUser.bio,
      avatarUrl: validatedData.data.avatarUrl ?? existingUser.avatarUrl
    };

    if (
      !finalData.name || !finalData.username || finalData.name.trim().length < 3 || finalData.username.trim().length < 3
    ) {
      return res.status(400).json({
        error: "Name and Username must be at least 3 characters long",
      });
    }

    const updatedUser = await user.findByIdAndUpdate(
      req.user.userId,
      { $set: finalData },
      { new: true }).select("-password");
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.errors ? error.errors : error.message });
  }
};


export const updateEmail = async (req, res) => {
  try {
    const validatedData = updateEmailSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ errors: validatedData.error.issues[0].message });
    }
    const { email } = validatedData;
    const updatedUser = await user.findByIdAndUpdate(
      req.user.userId,
      { $set: { email } },
      { new: true }).select("-password");
    res.status(200).json({ message: "Email updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.errors ? error.errors : error.message });
  }
}


export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: "New password must be at least 8 characters long" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const existingUser = await user.findById(req.user.userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found, Please login Again" });
    }
    const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }
    const updatedUser = await user.findByIdAndUpdate(
      req.user.userId,
      { $set: { password: hashedPassword } },
      { new: true }).select("-password");
    res.status(200).json({ message: "Password updated successfully"});
  } catch (error) {
    res.status(400).json({ error: error.errors ? error.errors : error.message });
  }
}

export const getProfile = async (req, res) => {
  try {
    // console.log(req.user);
    const userProfile = await user.findById(req.user.userId).select("-password");
    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(userProfile);
    res.status(200).json({ user: userProfile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const existingUser = await user.findById(req.user.userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.findByIdAndDelete(req.user.userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

