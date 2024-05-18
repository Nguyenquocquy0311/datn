import React, { useState, useEffect } from 'react';
import ModalApprove from './Modal/ModalApprove';

const ListRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null); // State để lưu ID của yêu cầu được chọn
  const [selectedRequest, setSelectedRequest] = useState(null); // State để lưu thông tin của yêu cầu được chọn

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:4000/requests');
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // Function to handle opening approve modal
  const handleOpenApproveModal = (request) => {
    setSelectedRequest(request); // Lưu thông tin yêu cầu được chọn vào state
    setIsApproveModalOpen(true); // Mở modal phê duyệt
  };

  // Function to handle closing approve modal
  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false); // Đóng modal phê duyệt
    setSelectedRequestId(null); // Reset ID của yêu cầu được chọn
    setSelectedRequest(null); // Reset thông tin của yêu cầu được chọn
  };

  return (
    <div className='mx-auto bg-white mt-8 p-4 rounded-xl w-full h-full justify-center'>
      <h2 className='mb-6'>Hiển thị tất cả {requests.length} bản ghi</h2>
      <table className="mx-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">STT</th>
            <th className="px-4 py-2">Loại yêu cầu</th>
            <th className="px-4 py-2">Tên tài sản</th>
            <th className="px-4 py-2">Số lượng</th>
            <th className="px-4 py-2">Tên người mượn</th>
            <th className="px-4 py-2">Email người mượn</th>
            <th className="px-4 py-2">Ngày tạo yêu cầu</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {requests.map((request, index) => (
            <tr key={request._id}>
              <td className="px-4 py-4 border-b border-gray-300">{index + 1}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.type}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.assetName}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.quantity}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.borrower}</td>
              <td className="px-4 py-4 border-b border-gray-300">{request.borrowerEmail}</td>
              <td className="px-4 py-4 border-b border-gray-300">{new Date(request.requestDate).toLocaleDateString()}</td>
              {/* <td className="px-4 py-4 border-b border-gray-300">{request.createdAt}</td> */}
              <td className="px-4 py-4 border-b border-gray-300">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => handleOpenApproveModal(request)}
                >
                  Phê Duyệt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Approve modal */}
      <ModalApprove
        isOpen={isApproveModalOpen}
        onClose={handleCloseApproveModal}
        requestId={selectedRequest ? selectedRequest._id : null} // Pass requestId to ModalApprove
      />
    </div>
  );
};

export default ListRequests;
