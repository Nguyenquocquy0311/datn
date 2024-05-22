import React, { useState, useEffect } from 'react';
import ModalApprove from './Modal/request/ModalApprove';
import { Pagination } from '@nextui-org/react';

const ListRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null); // State để lưu thông tin của yêu cầu được chọn
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState('all'); // State để lưu trạng thái phê duyệt được chọn

  const [page, setPage] = useState(1); // State cho trang hiện tại
  const rowsPerPage = 10;

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
    setSelectedRequest(null); // Reset thông tin của yêu cầu được chọn
  };

  // Filter requests based on selected approval status
  const filteredRequests = requests.filter(request => {
    if (selectedApprovalStatus === 'approved') return request.isApproved === true;
    if (selectedApprovalStatus === 'notApproved') return request.isApproved === false;
    return true; // 'all' case
  });

  // Calculate the total number of pages
  const pages = Math.ceil(filteredRequests.length / rowsPerPage);

  // Get the current items to display
  const currentItems = filteredRequests.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className='mx-auto bg-white mt-5 p-4 rounded-xl w-full h-[89vh] justify-center'>
      <div className='flex justify-between items-center mb-4'>
        <h2>Có tất cả {filteredRequests.length} bản ghi</h2>
      
        {/* Dropdown to select approval status */}
        <div className='flex items-center'>
          <label className='text-gray-700 text-sm font-bold mr-2' htmlFor='approvalStatus'>
            Chọn trạng thái phê duyệt:
          </label>
          <select
            id='approvalStatus'
            value={selectedApprovalStatus}
            onChange={(e) => {
              setSelectedApprovalStatus(e.target.value);
              setPage(1); // Reset về trang đầu tiên khi thay đổi trạng thái
            }}
            className='px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
          >
            <option value='all'>Tất cả</option>
            <option value='approved'>Đã phê duyệt</option>
            <option value='notApproved'>Chưa phê duyệt</option>
          </select>
        </div>

        <Pagination
          showControls
          size='lg'
          color="secondary"
          total={pages}
          initialPage={page}
          onChange={(page) => setPage(page)}
        />
      </div>

      <table className="mx-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-4">STT</th>
            <th className="px-4 py-4">Loại yêu cầu</th>
            <th className="px-4 py-4">Tên tài sản</th>
            <th className="px-4 py-4">Số lượng</th>
            <th className="px-4 py-4">Tên người mượn</th>
            <th className="px-4 py-4">Email người mượn</th>
            <th className="px-4 py-4">Ngày tạo yêu cầu</th>
            <th className="px-4 py-4">Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {currentItems.map((request, index) => (
            <tr key={request._id}>
              <td className="px-4 py-3 border-b border-gray-300">{(page - 1) * rowsPerPage + index + 1}</td>
              <td className="px-4 py-3 border-b border-gray-300">{request.type}</td>
              <td className="px-4 py-3 border-b border-gray-300">{request.assetName}</td>
              <td className="px-4 py-3 border-b border-gray-300">{request.quantity}</td>
              <td className="px-4 py-3 border-b border-gray-300">{request.borrower}</td>
              <td className="px-4 py-3 border-b border-gray-300">{request.borrowerEmail}</td>
              <td className="px-4 py-3 border-b border-gray-300">{new Date(request.requestDate).toLocaleDateString()}</td>
              <td className="px-4 py-3 border-b border-gray-300">
                {!request.isApproved ? <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => handleOpenApproveModal(request)}
                >
                  Phê duyệt
                </button> : <p
                  className="bg-slate-400 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Đã duyệt
                </p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Approve modal */}
      <ModalApprove
        isOpen={isApproveModalOpen}
        onClose={handleCloseApproveModal}
        requestId={selectedRequest ? selectedRequest._id : null} 
        onSubmit={handleCloseApproveModal}
      />
    </div>
  );
};

export default ListRequests;
