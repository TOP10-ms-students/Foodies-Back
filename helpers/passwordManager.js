import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = plainPassword => bcrypt.hashSync(plainPassword, saltRounds);

const isPasswordValid = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

export default {
    hashPassword,
    isPasswordValid,
};
