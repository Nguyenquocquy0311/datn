import React, { useState } from "react";
import { EyeIcon } from "../common/icon/EyeIcon";
import { EyeSlashIcon } from "../common/icon/EyeSlashIcon";

const ModalEditUser = ({ isOpen, onClose, onSave, userData }) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
    onClose();
  };

  const handleIsShowPass = () => {
    setIsShowPass(!isShowPass);
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
            <h2 className="text-2xl font-bold mb-4 text-center">Update User Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={() => {}}
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
                  value={userData.email}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                  Department:
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={userData.department}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                  Position:
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={userData.position}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={userData.role}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password:
                </label>
                <input
                  type={isShowPass ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <div
                  onClick={handleIsShowPass}
                  className="absolute inset-y-0 right-0 pr-3 mt-5 flex items-center text-gray-700 cursor-pointer"
                >
                  {isShowPass ? <EyeIcon /> : <EyeSlashIcon />}
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalEditUser
