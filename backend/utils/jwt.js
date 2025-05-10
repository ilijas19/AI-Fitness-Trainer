import jwt from "jsonwebtoken";

const createJwt = ({ payload, expiresIn }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJwt = createJwt({ payload: user, expiresIn: "1d" });
  const refreshTokenJwt = createJwt({
    payload: { user, refreshToken },
    expiresIn: "3d",
  });

  res.cookie("accessToken", accessTokenJwt, {
    signed: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.cookie("refreshToken", refreshTokenJwt, {
    signed: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 3,
  });
};
