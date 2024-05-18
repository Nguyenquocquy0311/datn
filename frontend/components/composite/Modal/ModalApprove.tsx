import React, { useState } from 'react';

const ModalApprove = ({ isOpen, onClose, onSubmit, requestId }) => {
  const [approverName, setApproverName] = useState('');
  const [approverEmail, setApproverEmail] = useState('');
  const [approvalDate, setApprovalDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(requestId, approverName, approverEmail, approvalDate);
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
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
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
                  value={approvalDate.toISOString().split('T')[0]} // Chuyển định dạng ngày về YYYY-MM-DD
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
