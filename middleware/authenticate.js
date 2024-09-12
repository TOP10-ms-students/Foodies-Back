import {ApiError} from "../errors/apiError.js";
import tokenManager from "../helpers/tokenManager.js";
import userRepository from "../repository/userRepository.js";

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(new ApiError(401, "Authorization header missing"));
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
        return next(new ApiError(401, "Invalid Authorization header format"));
    }

    try {
        const { id } = tokenManager.decode(token);

        req.user = await userRepository.getUser({ id, token });

        next();
    } catch (e) {
        next(new ApiError(401, "Not authorized"));
    }
};

export default authenticate;
