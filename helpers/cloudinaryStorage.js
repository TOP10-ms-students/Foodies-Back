import { v2 as cloudinary } from 'cloudinary';
import * as fs from "node:fs/promises";

const { CLOUDINARY_NAME, CLOUDINARY_PUBLIC_KEY, CLOUDINARY_SECRET_KEY } = process.env;

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_PUBLIC_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
});

const upload = async ({ path: localFilePath }, folder) => {
    try {
        const uploadedFile = await cloudinary.uploader.upload(localFilePath, {
            folder,
            transformation: [
                { quality: 'auto' },
                { fetch_format: 'auto' }
            ]
        });

        return uploadedFile.url
    } catch (error) {
        throw error;
    } finally {
        await fs.unlink(localFilePath);
    }
}

export default {
    upload,
}