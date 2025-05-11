import CustomError from "../errors/error-index.js";
import { verifyJwt, attachCookiesToResponse } from "../utils/jwt.js";
import Token from "../model/Token.js";

export const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (req.user.role === "admin") return next();
    if (roles.includes(req.user.role)) return next();
    throw new CustomError.UnauthorizedError(
      "Not Authorized To Access this route"
    );
  };
};

export const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  if (!accessToken && !refreshToken) {
    throw new CustomError.UnauthenticatedError("Authentication Failed");
  }
  if (accessToken) {
    const decoded = verifyJwt(accessToken);
    req.user = decoded.user;
    return next();
  }
  if (refreshToken) {
    const decoded = verifyJwt(refreshToken);
    const token = await Token.findOne({
      user: decoded.user.userId,
      refreshToken: decoded.refreshToken,
    });
    if (!token || !token.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication Failed");
    }
    req.user = decoded.user;
    attachCookiesToResponse({
      res,
      user: decoded.user,
      refreshToken: decoded.refreshToken,
    });
    return next();
  }
  throw new CustomError.UnauthenticatedError("Authentication Failed");
};
