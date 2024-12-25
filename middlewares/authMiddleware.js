import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication failed");
  }

  try {
    const { userId, role } = verifyToken(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication failed");
  }
};

export const protectedRoute = (...roles) => {

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError("You are not authorized to access this route");
    }

    next();
  };
};
