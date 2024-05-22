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

router.put('/assets/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'quantity', 'category', 'condition', 'price', 'status']; // Replace with your asset properties
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).send({ error: 'Asset not found' });
    }

    updates.forEach((update) => {
      asset[update] = req.body[update];
    });

    await asset.save();
    res.send(asset);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Route để xóa một tài sản
router.delete('/assets/:id', getAsset, async (req, res) => {
    try {
        await res.asset.remove;
        await Asset.findByIdAndDelete(req.params.id);
        res.json({ message: 'Asset deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware để lấy tài sản bằng id
async function getAsset(req, res, next) {
    let asset;
    try {
        asset = await Asset.findById(req.params.id);
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
