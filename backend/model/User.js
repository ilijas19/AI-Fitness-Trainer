import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: {
        validator: function (e) {
          return validator.isEmail(e);
        },
        message: "Not valid email",
      },
    },
    password: {
      type: String,
      required: true,
      maxLength: 60,
      minLength: 4,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    trainingPlan: {
      type: mongoose.Types.ObjectId,
    },
    mealPlan: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export default mongoose.model("User", userSchema);
