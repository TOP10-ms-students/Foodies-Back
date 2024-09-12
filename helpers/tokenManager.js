import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const generate = payload => jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

const decode = token => jwt.verify(token, JWT_SECRET);

export default {
    generate,
    decode,
};
