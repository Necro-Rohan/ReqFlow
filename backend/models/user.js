import mongoose from "mongoose";

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
  username: {
    type: String,
    unique: true,
    trim: true
  },
  avatarUrl: {
    type: String
  }
}, { timestamps: true, versionKey: false });

const user = mongoose.model("User", userSchema);

export default user;