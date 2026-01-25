import mongoose from "mongoose";
import { de } from "zod/v4/locales";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  avatarUrl: {
    type: String,
    default: "https://api.dicebear.com/7.x/avataaars/svg?seed=necro"
  }
}, { timestamps: true, versionKey: false });

const user = mongoose.model("User", userSchema);

export default user;