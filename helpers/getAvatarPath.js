import * as fs from "node:fs/promises";
import path from "node:path";

const avatarsPathRoot = path.resolve("public", "avatars");
const oldAvatarsPathRoot = path.resolve("public");

export const getAvatarPath = async data => {
    const { path: oldPath, filename } = data;
    const newPath = path.join(avatarsPathRoot, filename);
    const avatarPath = path.join("avatars", filename);

    await fs.rename(oldPath, newPath);

    return avatarPath;
};

export const removeAvatarFile = async oldPath => {
    const avatarPath = path.join(oldAvatarsPathRoot, oldPath);
    
    try {
        await fs.unlink(avatarPath);
    } catch (error) {
        return console.log({ messsage: "There is no such file or directory to destroy the old avatar" });
    }
};
