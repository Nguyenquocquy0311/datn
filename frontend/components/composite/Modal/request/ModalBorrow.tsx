import { getUserInfo } from '@/slices/redux';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalBorrow = ({ isOpen, onClose, assetId, assetName }) => {
  const [borrowQuantity, setBorrowQuantity] = useState(1); // Số lượng mặc định là 1
  const [borrowDate] = useState(new Date()); // Ngày mượn mặc định là ngày hôm nay
  const userInfo = useSelector(getUserInfo);

  // Function to handle submitting the borrow form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const borrowRequest = {
      assetName: assetName,
      quantity: borrowQuantity,
      type: 'Mượn', // Loại yêu cầu
      borrower: userInfo.name, // Tên người mượn
      borrowerEmail: userInfo.email, // Email người mượn
    };

    try {
      const response = await fetch('http://localhost:4000/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(borrowRequest),
      });
      console.log(borrowRequest)

      if (!response.ok) {
        throw new Error('Failed to send borrow request');
      }

      toast.success('Borrow request sent successfully!');
      onClose(); // Close the modal after successful submission
    } catch (error) {
      toast.error('Có lỗi khi gửi yêu cầu mượn. Vui lòng thử lại!');
    }
  };

  useEffect(() => {
    console.log(userInfo)
    
  },[])

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
            <h2 className="text-2xl font-bold mb-4 text-center">Mượn tài sản</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tên tài sản:</label>
                <input
                  type="text"
                  value={assetName}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  disabled
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
              {/* <div className="mb-4">
                <p className="w-full px-3 py-2 border rounded-lg">Ngày mượn: {borrowDate.toLocaleDateString()}</p>
              </div> */}
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
