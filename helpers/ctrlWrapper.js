import { ApiError } from "../errors/apiError.js";
import { AppError, errorTypes } from "../errors/appError.js";

export const controllerKey = Symbol("controller");

const ctrlWrapper = ctrl => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            if (error instanceof ApiError) {
                return next(new ApiError(error.status, error.message));
            }
            if (error instanceof AppError) {
                switch (error.errorType) {
                    case errorTypes.ALREADY_EXIST:
                        next(new ApiError(409, error.message));
                        break;
                    case errorTypes.NOT_FOUND:
                        next(new ApiError(404, error.message));
                        break;
                    case errorTypes.INVALID_CRED:
                    case errorTypes.INVALID_TOKEN:
                    case errorTypes.UNAUTHORIZED:
                        next(new ApiError(401, error.message));
                        break;
                    case errorTypes.ALREADY_VERIFIED:
                        next(new ApiError(400, error.message));
                        break;
                    default:
                        next(error);
                }
                return;
            }
            next(error);
        }
    };
    Object.defineProperty(func, "name", { value: ctrl.name });
    func[controllerKey] = true;

    return func;
};

export default ctrlWrapper;
