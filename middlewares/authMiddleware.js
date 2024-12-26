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

export const checkTestUser = (req, res, next) => {
  if (req.user.userId === "676d56d681a61a3020e95899") {
    throw new BadRequestError("Test user. For viewing purpose only");
  }

  next();
};
