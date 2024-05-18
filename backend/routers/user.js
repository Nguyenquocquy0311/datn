const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

//lấy danh sách user
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to get login history of a specific user
router.get('/users/:_id/login-history', auth, async (req, res) => {
    try {
        const userId = req.params._id;

        // Find the user by their _id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Check if the user making the request has permission to view the login history
        // You may need to adjust this logic based on your application's requirements
        if (req.user._id.toString() !== userId.toString()) {
            return res.status(403).send({ error: 'Unauthorized' });
        }

        // Send the login history
        res.send(user.loginHistory);
    } catch (error) {
        res.status(500).send(error);
    }
});

//tạo mới 1 user
router.post('/users', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

//đăng nhập
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }

        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Sửa thông tin người dùng
router.patch('/users/:_id', auth, async (req, res) => {
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

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

// Route to handle forgot password request
router.post('/users/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'Email not found' });
        }

        // Generate a new random password
        const newPassword = Math.random().toString(36).slice(-8); // Generate an 8-character random password
        user.password = newPassword;
        await user.save();

        // Send the new password to the user's email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                email: user.email, // Your email address for sending emails
                pass: user.password // Your email password
            }
        });

        const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Forgot Password - New Password',
            text: `Your new password is: ${newPassword}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send({ error: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                res.send({ message: 'New password sent to your email' });
            }
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.post('/users/me/logout', auth, async (req, res) => {
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

module.exports = router;
