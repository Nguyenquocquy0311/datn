const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        enum: ['New', 'Used', 'Refurbished'],
        default: 'New'
    },
    status: {
        type: String,
        enum: ['Available', 'Unavailable'],
        default: 'Available'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: String,
        required: true
    }
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
