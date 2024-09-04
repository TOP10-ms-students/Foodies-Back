import jwt from "jsonwebtoken";
import {ApiError} from "../errors/apiError.js";
import {UsersService} from "../services/usersServices.js";

const {JWT_SECRET} = process.env;

const service = new UsersService();

const authenticate = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return next(new ApiError(401, "Authorization header missing"));
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
        return next(new ApiError(401, "Invalid Authorization header format"));
    }

    try {
        const {id} = jwt.verify(token, JWT_SECRET);
        const user = await service.getCurrentUser(id);

        if (!user.token || user.token !== token) {
            return next(new ApiError(401, "Invalid token"));
        }

        req.user = user;

        next();
    } catch (error) {
        return next(new ApiError(401, error.message));
    }
};

export default authenticate;
