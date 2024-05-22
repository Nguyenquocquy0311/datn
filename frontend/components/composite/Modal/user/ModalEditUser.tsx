import React, { useState } from "react";
import { EyeIcon } from "../../common/icon/EyeIcon";
import { EyeSlashIcon } from "../../common/icon/EyeSlashIcon";
import { ToastContainer, toast } from "react-toastify";

const ModalEditUser = ({ isOpen, onClose, onSave, userData }) => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const roles = ["admin", "user", "manager"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredUserData = {};
    for (const key in updatedUserData) {
      if (updatedUserData[key] !== userData[key]) {
        filteredUserData[key] = updatedUserData[key];
      }
    }

    if (Object.keys(filteredUserData).length === 0) {
      onClose();
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredUserData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      toast.success('Cập nhật thành công!');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleIsShowPass = () => {
    setIsShowPass(!isShowPass);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-50">
          <div className="relative bg-white w-full max-w-md p-6 rounded-lg">
            <button className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Cập nhật thông tin người dùng</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Họ tên:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedUserData.name || userData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedUserData.email || userData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                  Phòng ban:
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={updatedUserData.department || userData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                  Vị trí:
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={updatedUserData.position || userData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  value={updatedUserData.role || userData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalEditUser;
