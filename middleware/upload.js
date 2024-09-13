import multer from "multer";
import path from "node:path";
import { ApiError } from "../errors/apiError.js";

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

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    if (!allowedMimeTypes.includes(file.mimetype)) return cb(new ApiError(400, 'Invalid file type. Only JPG and PNG files are allowed.'), false);

    cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;