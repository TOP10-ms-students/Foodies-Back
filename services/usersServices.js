import Users from "../db/models/users.cjs";
import bcrypt from "bcrypt";

export const findUser = (query) => Users.findOne(query);
export const signup = async (data) => {
  try {
    const {password} = data;
    const hashPassword = await bcrypt.hash(password, 10);
    return await Users.create({...data, password: hashPassword});
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email in use";
    }
    throw error;
  }
};
