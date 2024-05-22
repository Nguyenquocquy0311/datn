import { useState, useEffect } from 'react';
import ModalUpdateAsset from './Modal/asset/ModalUpdateAsset';
import ModalDelete from './Modal/asset/ModalDelete';
import ModalBorrow from './Modal/request/ModalBorrow';
import { Button, Pagination, Tooltip } from '@nextui-org/react';
import React from 'react';
import { EyeIcon } from './common/icon/EyeIcon';
import { EditIcon } from './common/icon/EditIcon';
import { DeleteIcon } from './common/icon/DeleteIcon';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { getUserInfo } from '@/slices/redux';
import ModalAddAsset from './Modal/asset/ModalAddAsset';
import ModalDetailAsset from './Modal/asset/ModalDetail';

const ListAssets = () => {
  const [assets, setAssets] = useState([]);
  const [assetInfo, setAssetInfo] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
  })
  const userInfo = useSelector(getUserInfo)

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssetId(null);
    setIsDetailModalOpen(false)
    setIsEditModalOpen(false)
  };

  const handleSaveAssetData = () => {
    handleCloseModal();
  };

  // lấy danh sách tài sản
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

    fetchAssets()
  }, []);

  const handleEditAsset = (assetId) => {
    setSelectedAssetId(assetId);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (assetId) => {
    setSelectedAssetId(assetId);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDetailModal = (assetId) => {
    setSelectedAssetId(assetId);
    setIsDetailModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedAssetId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAsset = () => {
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
    <div className='mx-auto bg-white mt-5 p-4 rounded-xl w-full h-[89vh] justify-center'>
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
          />
        </div>
      </div>
      <table className="mx-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-4">Số thứ tự</th>
            <th className="px-4 py-4">Tên tài sản</th>
            <th className="px-4 py-4">Số lượng</th>
            <th className="px-4 py-4">Loại tài sản</th>
            <th className="px-4 py-4">Nguyên giá</th>
            <th className="px-4 py-4">Tình trạng</th>
            <th className="px-4 py-4">Trạng thái</th>
            <th className="px-4 py-4">Hành động</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {items.map((asset, index) => (
            <tr key={asset._id}>
              <td className="px-4 py-3 border-b border-gray-300">{(page - 1) * rowsPerPage + index + 1}</td>
              <td className="px-4 py-3 border-b border-gray-300">{asset.name}</td>
              <td className="px-4 py-3 border-b border-gray-300">{asset.quantity}</td>
              <td className="px-4 py-3 border-b border-gray-300">{asset.category}</td>
              <td className="px-4 py-3 border-b border-gray-300">{asset.price.toLocaleString('vi-VN')} VNĐ</td>
              <td className="px-4 py-3 border-b border-gray-300">{asset.condition}</td>
              <td className="px-4 py-3 border-b border-gray-300"><div className={classnames(asset.status === 'Unavailable' ? ' border-orange-400 text-orange-400': 'border-green-400 text-green-400', 'border-2 rounded-md')}>{asset.status === 'Unavailable' ? 'Đang được mượn' : 'Sẵn sàng'}</div></td>
              <td className="px-4 py-3 border-b border-gray-300">
                {userInfo.role === 'user' ? <button className={classnames('rounded-lg px-4 py-1', asset.status === 'Unavailable' ? 'bg-slate-300' : 'bg-blue-500 text-white hover:bg-blue-400')} onClick={() => handleOpenBorrowModal(asset)} disabled={asset.status === 'Unavailable'}>Mượn</button> :
                <div className="flex items-center justify-center space-x-2">
                  <Tooltip content="Thông tin chi tiết" className='bg-slate-500 text-white p-2 rounded-lg'>
                    <span className="text-lg text-gray-500 cursor-pointer hover:text-slate-500" onClick={() => handleOpenDetailModal(asset._id)}>
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
                </div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalUpdateAsset
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAssetData}
        assetId={selectedAssetId}
      />
      <ModalAddAsset
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <ModalDetailAsset
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        assetId={selectedAssetId}
      />
      <ModalDelete
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onSave={handleDeleteAsset}
        assetId={selectedAssetId}
      />
      <ModalBorrow
        isOpen={isBorrowModalOpen}
        onClose={handleCloseBorrowModal}
        assetId={selectedAsset ? selectedAsset._id : null}
        assetName={selectedAsset ? selectedAsset.name : null}
      />
    </div>
  );
};

export default ListAssets;
