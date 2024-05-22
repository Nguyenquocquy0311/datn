const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        if (!token.startsWith('Bearer ')) {
            throw new Error('Invalid authorization format');
        }

        const tokenWithoutBearer = token.replace('Bearer ', '');

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': tokenWithoutBearer });

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        req.token = tokenWithoutBearer;

        // Tiếp tục đến middleware hoặc router tiếp theo
        next();
    } catch (error) {
        // Xử lý lỗi và gửi phản hồi với mã lỗi 401
        res.status(401).send({ error: error.message });
    }
};

module.exports = auth;
