import React, { useState, useEffect } from "react";
import { EyeIcon } from "../../common/icon/EyeIcon";
import { EyeSlashIcon } from "../../common/icon/EyeSlashIcon";

const ModalDetailUser = ({ isOpen, onClose, userId }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    role: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
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
            <h2 className="text-2xl font-bold mb-4 text-center">Thông tin chi tiết người dùng</h2>
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDetailUser;
