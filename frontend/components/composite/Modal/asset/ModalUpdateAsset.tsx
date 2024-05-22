import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ModalUpdateAsset = ({ isOpen, onClose, onSave, assetId }) => {
  const [assetData, setAssetData] = useState({
    name: '',
    quantity: '',
    category: '',
    condition: '',
    price: '',
    status: '',
    // Add other fields as necessary
  }); // State for asset data

  const [modifiedFields, setModifiedFields] = useState({}); // State to track modified fields

  // Fetch asset data on component mount or when assetId changes
  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/assets/${assetId}`); // Fetch data using assetId
        if (response.ok) {
          const data = await response.json();
          setAssetData(data);
          setModifiedFields({}); // Reset modified fields
        } else {
          console.error("Error fetching asset data:", response.statusText);
          // Handle errors (optional: show error message to user)
        }
      } catch (error) {
        console.error("Error fetching asset data:", error);
        // Handle errors (optional: show error message to user)
      }
    };

    if (assetId) {
      fetchAssetData(); // Call fetch function if assetId is available
    }
  }, [assetId]); // Dependency array: fetch on assetId change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setModifiedFields((prevFields) => ({
      ...prevFields,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare only modified fields to be sent
    const updatedData = {};
    for (const key in assetData) {
      if (modifiedFields[key]) {
        updatedData[key] = assetData[key];
      }
    }

    try {
      const response = await fetch(`http://localhost:4000/assets/${assetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedAsset = await response.json();
        toast.success('Asset updated successfully!');
        onSave(updatedAsset);
        onClose();
      } else {
        console.error("Error updating asset:", response.statusText);
        // Handle errors (optional: show error message to user)
      }
    } catch (error) {
      console.error("Error updating asset:", error);
      // Handle errors (optional: show error message to user)
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
            <h2 className="text-2xl font-bold mb-4 text-center">Update Asset Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Tên:
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
                  Số lượng:
                </label>
                <input
                  type="text"
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
                  Loại tài sản:
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="condition">
                  Tình trạng:
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Nguyên giá:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={assetData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Trạng thái:
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
              {/* Add more input fields for other asset properties as needed */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Chỉnh sửa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUpdateAsset;
