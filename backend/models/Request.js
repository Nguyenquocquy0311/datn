const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Mượn', 'Trả'],
        required: true
    },
    assetName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    requestDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    approvalDate: {
        type: Date
    },
    statusBefore: {
        type: String
    },
    statusAfter: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    borrower: {
        type: String,
        required: true
    },
    borrowerEmail: {
        type: String,
        required: true
    },
    approver: {
        type: String,
        required: function () {
            return this.isApproved;
        }
    },
    approverEmail: {
        type: String,
        required: function () {
            return this.isApproved;
        }
    }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
