import { ApiError } from "../errors/apiError.js";

export const schemaKey = Symbol("schema");

const validateBody = schema => {
    const func = (req, _, next) => {
        const { error, value } = schema.validate(req.body, { allowUnknown: true, stripUnknown: true });
        if (error) {
            return next(new ApiError(400, error.message));
        }
        req.body = value;
        next();
    };

    func[schemaKey] = schema;

    return func;
};

export default validateBody;
