import authenticate from "./authenticate.js";

const optionalAuthenticate = (req, res, next) => {
    const handleOptionalAuthentication = (err) => {
        if (err) {
            return next();
        }

        next();
    };

    authenticate(req, res, handleOptionalAuthentication);
};

export default optionalAuthenticate;
