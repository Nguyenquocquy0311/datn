const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://assets:quyisme@cluster0.zlxkwvj.mongodb.net/app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Lỗi kết nối database:', err);
});
  
db.once('open', () => {
  console.log('Kết nối database thành công');
});

// Định nghĩa schema và model cho dữ liệu trong MongoDB
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  id: Number,
  name: String,
  price: String,
  quantity: Number
});

const DataModel = mongoose.model('Data', dataSchema);

// Lấy dữ liệu từ MongoDB
app.get('/api/get', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.send(data);
  } catch (error) {
    console.error('Lỗi lấy dữ liệu từ MongoDB:', error);
    res.status(500).send('Lỗi lấy dữ liệu từ MongoDB');
  }
});

// Thêm dữ liệu vào MongoDB
app.post('/api/post', async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    await newData.save();
    const data = await DataModel.find();
    res.send({
      status: true,
      data: data
    });
  } catch (error) {
    console.error('Lỗi thêm dữ liệu vào MongoDB:', error);
    res.status(500).send('Lỗi thêm dữ liệu vào MongoDB');
  }
});

// Cập nhật dữ liệu trong MongoDB
app.put('/api/put/:id', async (req, res) => {
  try {
    const updatedData = await DataModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    const data = await DataModel.find();
    res.send({
      status: true,
      data: data
    });
  } catch (error) {
    console.error('Lỗi cập nhật dữ liệu trong MongoDB:', error);
    res.status(500).send('Lỗi cập nhật dữ liệu trong MongoDB');
  }
});

// Xóa dữ liệu trong MongoDB
app.delete('/api/delete/:id', async (req, res) => {
  try {
    await DataModel.findOneAndDelete({ id: req.params.id });
    const data = await DataModel.find();
    res.send({
      status: true,
      data: data
    });
  } catch (error) {
    console.error('Lỗi xóa dữ liệu trong MongoDB:', error);
    res.status(500).send('Lỗi xóa dữ liệu trong MongoDB');
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
