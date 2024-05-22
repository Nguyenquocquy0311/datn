import React, { useEffect, useState } from "react";

const ModalDetailAsset = ({ isOpen, onClose, assetId }) => {
  const [assetData, setAssetData] = useState({}); // State for asset data

  // Fetch asset data on component mount or when assetId changes
  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/assets/${assetId}`); // Fetch data using assetId
        if (response.ok) {
          const data = await response.json();
          setAssetData(data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-50">
          <div className="relative bg-white w-full max-w-md p-6 rounded-lg">
            <button
              className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Thông tin chi tiết tài sản</h2>
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
                  onChange={() => {}}
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
                  onChange={() => {}}
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
                  onChange={() => {}}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Tình trạng:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={assetData.condition}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                          </div>
                          <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Nguyên giá:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={assetData.price.toLocaleString('vi-VN') + ' VNĐ'}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                </div>   
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDetailAsset;
