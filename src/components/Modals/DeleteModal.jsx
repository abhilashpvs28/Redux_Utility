export const DeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Delete Utility</h2>
          <p className="text-gray-700 mb-4">Are you sure you want to delete this utility?</p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };