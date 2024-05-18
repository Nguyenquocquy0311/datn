import React, { useState } from 'react';

const ModalBorrow = ({ isOpen, onClose, onSubmit, assetId, assetName, assetCategory }) => {
  const [borrowQuantity, setBorrowQuantity] = useState(1); // Số lượng mặc định là 1
  const [borrowDate, setBorrowDate] = useState(new Date()); // Ngày mượn mặc định là ngày hôm nay

  // Function to handle submitting the borrow form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(assetId, borrowQuantity, borrowDate);
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
            <h2 className="text-2xl font-bold mb-4 text-center">Mượn tài sản: {assetName}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tên tài sản:</label>
                <input
                  type="text"
                  value={assetName}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                //   disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Loại tài sản:</label>
                <input
                  type="text"
                  value={assetCategory}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                //   disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Số lượng:</label>
                <input
                  type="number"
                  value={borrowQuantity}
                  onChange={(e) => setBorrowQuantity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <p className='w-full px-3 py-2 border rounded-lg'>Ngày mượn: {borrowDate.toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Mượn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBorrow;
