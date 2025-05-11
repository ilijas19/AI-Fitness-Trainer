import { StatusCodes } from "http-status-codes";
import User from "../model/User.js";
import Token from "../model/Token.js";
import CustomError from "../errors/error-index.js";
import createUserToken from "../utils/createUserToken.js";
import { attachCookiesToResponse } from "../utils/jwt.js";
import crypto from "crypto";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new CustomError.BadRequestError("All Fields Must Be Provided");
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new CustomError.BadRequestError("Email Already in use");
  }
  await User.create({ username, email, password });
  res.status(StatusCodes.CREATED).json({ msg: "Account Created Successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("All credentials must be provided");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.NotFoundError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.BadRequestError("Invalid credentials");
  }
  const tokenUser = createUserToken(user);
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    attachCookiesToResponse({
      res,
      user: tokenUser,
      refreshToken: existingToken.refreshToken,
    });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Login successfully", currentUser: tokenUser });
  }
  const refreshToken = crypto.randomBytes(64).toString("hex");
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  await Token.create({
    user: user._id,
    refreshToken,
    ip,
    userAgent,
  });
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Login successfully", currentUser: tokenUser });
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  await Token.findOneAndDelete({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ msg: "Logout" });
};

export const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ currentUser: req.user });
};
