import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Types.ObjectId,
  },
  refreshToken: {
    required: true,
    type: String,
  },
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Token", tokenSchema);
