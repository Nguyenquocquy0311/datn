const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Lấy token từ header 'Authorization'
        const token = req.header('Authorization');

        // Kiểm tra xem token có tồn tại không
        if (!token) {
            throw new Error('Authorization token is missing');
        }

        // Kiểm tra xem token có bắt đầu bằng 'Bearer ' không
        if (!token.startsWith('Bearer ')) {
            throw new Error('Invalid authorization format');
        }

        // Loại bỏ 'Bearer ' từ token
        const tokenWithoutBearer = token.replace('Bearer ', '');

        // Xác thực và lấy dữ liệu từ token
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        // Tìm người dùng trong cơ sở dữ liệu dựa trên id và token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': tokenWithoutBearer });

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            throw new Error('User not found');
        }

        // Gán thông tin người dùng và token vào yêu cầu
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
