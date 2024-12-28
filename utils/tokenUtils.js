import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });

  return token;
};

export const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

  return verifiedToken;
};
