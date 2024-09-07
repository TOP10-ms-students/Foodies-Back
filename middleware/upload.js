import multer from "multer";
import path from "node:path";
import {ApiError} from "../errors/apiError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, callback) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    if (extension === "exe") {
        return callback(new ApiError(400, ".exe extension not allowed"));
    }
    callback(null, true);
};

const upload = multer({storage, limits, fileFilter});

export default upload;
