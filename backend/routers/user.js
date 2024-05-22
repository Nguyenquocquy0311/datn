const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const Request = require('../models/Request')

const router = express.Router()

//lấy danh sách user
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// xem lịch sử đăng nhập
router.get('/users/:_id/login-history', async (req, res) => {
    try {
        const userId = req.params._id

        // Find the user by their _id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }

        // Check if the user making the request has permission to view the login history
        // You may need to adjust this logic based on your application's requirements
        if (req.user._id.toString() !== userId.toString()) {
            return res.status(403).send({ error: 'Unauthorized' })
        }

        // Send the login history
        res.send(user.loginHistory)
    } catch (error) {
        res.status(500).send(error)
    }
})

//tạo mới 1 user
router.post('/users', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' })
        }

        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

//đăng nhập
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new Error('Email and password are required')
        }

        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Invalid login credentials' })
        }

        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

// sửa thông tin user
router.put('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'department', 'position', 'password', 'role'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (req.body.email) {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                return res.status(400).send({ error: 'Email already in use' });
            }
        }

        updates.forEach((update) => {
            if (update === 'password') {
                user[update] = bcrypt.hashSync(req.body[update], 8);
            } else {
                user[update] = req.body[update];
            }
        });
        
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route để xóa một user
router.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove;
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để lấy chi tiết một user bằng ID
router.get('/users/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Route để xóa một user
router.delete('/users/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để xem lịch sử mượn/trả của một người dùng bằng email
router.get('/users/history-requests/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const userRequests = await Request.find({ borrowerEmail: email, isApproved: true });

        res.json(userRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/users/:id', getUser, async(req, res) => {
    // View logged in user profile
    try {
        await User.findById(req.params.id);
        res.json(req.user)
    } catch (error) {
        res.status(500).send({ error })
    }
})

// lấy lại mật khẩu
router.post('/users/forgot-password/:email', async (req, res) => {
    try {
        const email = req.params.email

        // Check if the email exists in the database
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({ error: 'Email not found' })
        }

        // Generate a new random password
        const newPassword = Math.random().toString(36).slice(-8) // Generate an 8-character random password
        user.password = newPassword
        await user.save()

        // Send the new password to the user's email
        const transporter = nodemailer.createTransport({
            service: 'gmail'
        })

        const mailOptions = {
            from: 'noreply@gmail.com',
            to: email,
            subject: 'Forgot Password - New Password',
            text: `Mật khẩu mới của bạn là: ${newPassword}. Vui lòng không chia sẻ email này cho người khác!</br>Hãy đổi mật khẩu để đảm bảo tính an toàn !`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error)
                res.status(500).send({ error: 'Failed to send email' })
            } else {
                console.log('Email sent:', info.response)
                res.send({ message: 'New password sent to your email' })
            }
        })
    } catch (error) {
        console.error('Forgot password error:', error)
        res.status(500).send({ error: 'Internal server error' })
    }
})

router.post('/users/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
}

module.exports = router
