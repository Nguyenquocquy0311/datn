import React, { useState } from 'react';

const ModalApprove = ({ isOpen, onClose, onSubmit, requestId }) => {
  const [approver, setApprover] = useState('');
  const [approverEmail, setApproverEmail] = useState('');
  const [approvalDate, setApprovalDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const approvalData = {
      approver,
      approverEmail,
      // isApproved: true
    };

    try {
      const response = await fetch(`http://localhost:4000/requests/${requestId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(approvalData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      onSubmit(result); // You can pass the result to the parent component if needed
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Optionally handle the error
    }
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
            <h2 className="text-2xl font-bold mb-4 text-center">Phê duyệt yêu cầu</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tên Người Phê Duyệt:</label>
                <input
                  type="text"
                  value={approver}
                  onChange={(e) => setApprover(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Người Phê Duyệt:</label>
                <input
                  type="email"
                  value={approverEmail}
                  onChange={(e) => setApproverEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ngày Phê Duyệt:</label>
                <input
                  type="date"
                  value={approvalDate.toISOString().split('T')[0]}
                  onChange={(e) => setApprovalDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  Phê Duyệt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalApprove;
