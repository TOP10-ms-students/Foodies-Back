export class ApiError extends Error {
    constructor(statusCode, message = messageList[statusCode]) {
        super(message);
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
};
