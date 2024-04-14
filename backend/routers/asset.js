const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// Route để lấy danh sách tất cả tài sản
router.get('/assets', async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route để lấy chi tiết một tài sản bằng ID
router.get('/assets/:id', getAsset, (req, res) => {
    res.json(res.asset);
});

// Route để tạo một tài sản mới
router.post('/assets', async (req, res) => {
    const asset = new Asset(req.body);
    try {
        const newAsset = await asset.save();
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route để cập nhật thông tin của một tài sản
router.patch('/assets/:id', getAsset, async (req, res) => {
    if (req.body.name != null) {
        res.asset.name = req.body.name;
    }
    if (req.body.price != null) {
        res.asset.price = req.body.price;
    }
    // Tiếp tục cập nhật các trường khác nếu cần

    try {
        const updatedAsset = await res.asset.save();
        res.json(updatedAsset);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route để xóa một tài sản
router.delete('/assets/:id', getAsset, async (req, res) => {
    try {
        await res.asset.remove();
        res.json({ message: 'Asset deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware để lấy tài sản bằng name
async function getAsset(req, res, next) {
    let asset;
    try {
        asset = await Asset.findById(req.params.name);
        if (asset == null) {
            return res.status(404).json({ message: 'Cannot find asset' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.asset = asset;
    next();
}

module.exports = router;
