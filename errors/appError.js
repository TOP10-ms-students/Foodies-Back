export class AppError extends Error {
    constructor(errorType, message) {
        super(message);
        this.errorType = errorTypes[errorType];
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorTypes = {
    NOT_FOUND: "NOT_FOUND",
    ALREADY_EXIST: "ALREADY_EXIST",
    INVALID_CRED: "INVALID_CRED",
    INVALID_TOKEN: "INVALID_TOKEN",
    UNAUTHORIZED: "UNAUTHORIZED",
    ALREADY_VERIFIED: "ALREADY_VERIFIED",
};
