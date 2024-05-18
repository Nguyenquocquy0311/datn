import { useState, useEffect } from 'react';
import ModalAsset from './Modal/ModalAsset';
import ModalDelete from './Modal/ModalDelete';
import ModalBorrow from './Modal/ModalBorrow';
import { Button, Pagination, Tooltip } from '@nextui-org/react';
import React from 'react';
import { EyeIcon } from './common/icon/EyeIcon';
import { EditIcon } from './common/icon/EditIcon';
import { DeleteIcon } from './common/icon/DeleteIcon';
import classnames from 'classnames';

const ListAssets = () => {
  const [assets, setAssets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [assetData, setAssetData] = useState({
    name: "",
    quantity: "",
    status: "",
    category: "",
    price: "",
    condition: "",
    description: ""
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssetId(null);
  };

  const handleSaveAssetData = () => {
    console.log("Asset data saved:", assetData);
    handleCloseModal();
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:4000/assets');
        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  const handleEditAsset = (assetId) => {
    const selectedAsset = assets.find(asset => asset._id === assetId);
    if (selectedAsset) {
      setAssetData(selectedAsset);
      setSelectedAssetId(assetId);
      setIsModalOpen(true);
    }
  };

  const handleOpenDeleteModal = (assetId) => {
    setSelectedAssetId(assetId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedAssetId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAsset = () => {
    console.log("Deleted asset with ID:", selectedAssetId);
    handleCloseDeleteModal();
  };

  const handleOpenBorrowModal = (asset) => {
    setSelectedAsset(asset);
    setIsBorrowModalOpen(true);
  };

  const handleCloseBorrowModal = () => {
    setIsBorrowModalOpen(false);
    setSelectedAsset(null);
  };

  const handleBorrowAsset = (assetId, quantity, borrowDate) => {
    console.log(`Borrowing asset with ID ${assetId}, Quantity: ${quantity}, Borrow Date: ${borrowDate}`);
    handleCloseBorrowModal();
  };

  // Logic for pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(assets.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return assets.slice(start, end);
  }, [page, assets]);

  return (
    <div className='mx-auto bg-white mt-5 p-4 rounded-xl w-full h-full justify-center'>
      <div className='flex'>
        <h2 className='mb-6'>Hiển thị {rowsPerPage} trên tổng cộng {assets.length} bản ghi</h2>
        <div className="fixed right-4">
          <Pagination
            // isCompact
            showControls
            size='lg'
            color="secondary"
            initialPage={page}
            total={pages}
            onChange={(page) => setPage(page)}
            // className='border border-divider w-8 h-8'
          />
        </div>
      </div>
      <table className="mx-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Số thứ tự</th>
            <th className="px-4 py-2">Tên tài sản</th>
            <th className="px-4 py-2">Số lượng</th>
            <th className="px-4 py-2">Loại tài sản</th>
            <th className="px-4 py-2">Nguyên giá</th>
            <th className="px-4 py-2">Tình trạng</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {items.map((asset, index) => (
            <tr key={asset._id}>
              <td className="px-4 py-4 border-b border-gray-300">{index + 1}</td>
              <td className="px-4 py-4 border-b border-gray-300">{asset.name}</td>
              <td className="px-4 py-4 border-b border-gray-300">{asset.quantity}</td>
              <td className="px-4 py-4 border-b border-gray-300">{asset.category}</td>
              <td className="px-4 py-4 border-b border-gray-300">{asset.price.toLocaleString('vi-VN')} VNĐ</td>
              <td className="px-4 py-4 border-b border-gray-300">{asset.condition}</td>
              <td className="px-4 py-4 border-b border-gray-300">{asset.status === 'Unavailable' ? 'Đang được mượn' : 'Sẵn sàng'}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <button className={classnames('rounded-lg p-2', asset.status === 'Unavailable' ? 'bg-slate-300' : 'bg-blue-500 text-white hover:bg-blue-400')} onClick={() => handleOpenBorrowModal(asset)} disabled={asset.status === 'Unavailable'}>Mượn</button>
                {/* <div className="flex items-center justify-center space-x-2">
                  <Tooltip content="Thông tin chi tiết" className='bg-slate-500 text-white p-2 rounded-lg'>
                    <span className="text-lg text-gray-500 cursor-pointer hover:text-slate-500">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Chỉnh sửa" className='bg-blue-500 text-white p-2 rounded-lg'>
                    <span className="text-lg text-gray-500 cursor-pointer hover:text-blue-500" onClick={() => handleEditAsset(asset._id)}>
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Xóa tài sản" className='bg-red-500 text-white p-2 rounded-lg'>
                    <span className="text-lg text-gray-500 cursor-pointer hover:text-red-500" onClick={() => handleOpenDeleteModal(asset._id)}>
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAsset
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAssetData}
        assetData={assetData}
      />
      <ModalDelete
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onSave={handleDeleteAsset}
        assetData={{}}
      />
      <ModalBorrow
        isOpen={isBorrowModalOpen}
        onClose={handleCloseBorrowModal}
        onSubmit={handleBorrowAsset}
        assetId={selectedAsset ? selectedAsset._id : null}
        assetName={selectedAsset ? selectedAsset.name : null}
        assetCategory={selectedAsset ? selectedAsset.category : null}
      />
    </div>
  );
};

export default ListAssets;
