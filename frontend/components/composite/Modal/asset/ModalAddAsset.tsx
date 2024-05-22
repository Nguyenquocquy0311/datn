import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAddAsset = ({ isOpen, onClose }) => {
  const [assetData, setAssetData] = useState({
    name: '',
    quantity: '',
    category: '',
    price: '',
    condition: '',
    status: 'Available' // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData({ ...assetData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assetData)
      });

      if (!response.ok) {
        throw new Error('Failed to add asset');
      }

      toast.success('Asset added successfully!');
      onClose(); // Close the modal
    } catch (error) {
      toast.error('Failed to add asset. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-50">
          <div className="relative bg-white w-full max-w-md p-6 rounded-lg">
            <button
              className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Thêm mới tài sản</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Tên tài sản:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={assetData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={assetData.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={assetData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Price:
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={assetData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="condition">
                  Condition:
                </label>
                <input
                  type="text"
                  id="condition"
                  name="condition"
                  value={assetData.condition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Status:
                </label>
                <select
                  id="status"
                  name="status"
                  value={assetData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              {/* Add more input fields for other asset properties if needed */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAddAsset;
