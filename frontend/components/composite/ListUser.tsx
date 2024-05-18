import { useState, useEffect, SetStateAction } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, getKeyValue } from "@nextui-org/react";
import Modal from './Modal/ModalUser';
import { EyeIcon } from './common/icon/EyeIcon';
import { EditIcon } from './common/icon/EditIcon';
import { DeleteIcon } from './common/icon/DeleteIcon';

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // Thêm state mới để lưu _id của người dùng được chọn

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    role: "user"
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null); // Reset selectedUserId khi đóng modal
  };

  const handleSaveUserData = () => {
    // Thực hiện các thao tác lưu thông tin người dùng
    // ở đây, bạn có thể gọi API hoặc thực hiện các xử lý khác
    console.log("User data saved:", userData);
    handleCloseModal(); // Đóng modal sau khi lưu thông tin người dùng
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (userId) => {
    // Tìm thông tin người dùng được chọn từ danh sách users
    const selectedUser = users.find(user => user._id === userId);
    if (selectedUser) {
      setUserData(selectedUser); // Cập nhật thông tin người dùng trong state userData
      setSelectedUserId(userId); // Lưu _id của người dùng được chọn
      setIsModalOpen(true); // Mở modal để sửa thông tin người dùng
    }
  };

  return (
    <div className='mx-auto bg-white mt-8 p-4 rounded-xl w-full h-full justify-center'>
      <div className='mb-5'><h2>Có tất cả {users.length - users.length} bản ghi</h2></div>
      {/*<button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 right-2 fixed" onClick={handleOpenModal}>Add User</button></div> */}
      <table className="mx-auto border-collapse w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">STT</th>
            <th className="px-4 py-2">Tên</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phòng ban</th>
            <th className="px-4 py-2">Vị trí</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="px-4 py-4 border-b border-gray-300">{index + 1}</td>
              <td className="px-4 py-4 border-b border-gray-300">{user.name}</td>
              <td className="px-4 py-4 border-b border-gray-300">{user.email}</td>
              <td className="px-4 py-4 border-b border-gray-300">{user.department}</td>
              <td className="px-4 py-4 border-b border-gray-300">{user.position}</td>
              <td className="px-4 py-4 border-b border-gray-300">{user.role}</td>
              <td className="px-4 py-4 border-b border-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <Tooltip content="Details"  className='bg-slate-500 text-white p-2 rounded-lg'>
                    <span className="text-lg text-gray-500 cursor-pointer hover:text-blue-500">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit user" className='bg-blue-500 text-white p-2 rounded-lg'>
                    <span className="text-lg text-gray-500 cursor-pointer hover:text-blue-500" onClick={() => handleEditUser(user._id)}>
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user" className='bg-red-500 text-white p-2 rounded-lg'>
                    <span className="text-lg text-gray-500 cursor-pointer hover:text-red-500" onClick={() => handleEditUser(user._id)}>
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUserData}
        userData={userData}
      />
    </div>
  );
};

export default ListUser;
