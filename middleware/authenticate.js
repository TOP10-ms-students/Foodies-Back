import jwt from "jsonwebtoken";
import {ApiError} from "../errors/apiError.js";
import { findUser } from "../services/usersServices.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(ApiError(401, "Authorization header is required"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(ApiError(401, "Invalid token"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ id });

    if(!user) {
      return next(ApiError(401, "User not found"));
    }

    if (!user.token || user.token !== token) {
      return next(ApiError(401, "Invalid token"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(ApiError(401, error.message));
  }
};

export default authenticate;
