import React from "react";

const ModalDelete = ({ isOpen, onClose, onSave, assetData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
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
            <h2 className="text-2xl font-bold mb-4 text-center">Confirm Delete</h2>
            <p className="text-center text-red-500 mb-4">Are you sure you want to delete this asset?</p>
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600 mr-2"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDelete;
