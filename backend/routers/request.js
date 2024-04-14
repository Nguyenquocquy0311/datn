const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Get all requests
router.get('/requests', async (req, res) => {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Route to create a new request
router.post('/requests', async (req, res) => {
    try {
        const { type, assetName, quantity, borrower, borrowerEmail } = req.body;

        const newRequest = new Request({
            type,
            assetName,
            quantity,
            borrower,
            borrowerEmail
        });

        const savedRequest = await newRequest.save();

        res.status(201).json(savedRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Update request to approve
router.put('/requests/:_id/approve', async (req, res) => {
    try {
        const requestId = req.params._id;
        const { approver, approverEmail } = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(requestId, {
            approvalDate: Date.now(),
            isApproved: true,
            approver,
            approverEmail
        }, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found' });
        }

        res.json(updatedRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
