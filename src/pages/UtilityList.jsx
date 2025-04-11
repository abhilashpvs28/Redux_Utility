import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUtilities,
  deleteUtility,
  updateUtility,
} from "../features/auth/utilityThunk";
import Modal from "../components/Modal";
import ReusableTable from "../components/ReusableTable";

const UtilityList = () => {
  const dispatch = useDispatch();
  const { utilities, loading } = useSelector((state) => state.utility);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getUtilities());
  }, [dispatch]);

  const openEditModal = (utility) => {
    setEditData({ ...utility });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUtility(editData));
    closeModal();
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUtility({ id: deleteId }));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Columns to display in table
 
  const columns = [
    { key: "type", label: "Type" },
    { key: "usage_units", label: "Units" },
    { key: "amount_paid", label: "Amount Paid", render: (row) => `₹${row.amount_paid}` },
    { key: "bill_month", label: "Bill Month" },
    {
      key: "paid_on",
      label: "Paid On",
      render: (row) => new Date(row.paid_on).toLocaleDateString(),
    },
    {
      key: "created_at",
      label: "Created At",
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    { key: "remarks", label: "Remarks" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const searchKeys = ["type", "bill_month", "remarks"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Utilities List</h2>

      <ReusableTable
        data={utilities}
        columns={columns}
        searchKeys={searchKeys}
        fileName="utilities"
        title="Utility Table"
      />

      {/* Delete modal */}
      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this utility?"
        />
      )}

      {/* Edit modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Utility</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              {/* Same input fields */}
              <select name="type" value={editData.type} onChange={handleEditChange} required className="w-full border px-3 py-2 rounded">
                <option value="">Select Utility Type</option>
                <option value="water">Water</option>
                <option value="electricity">Electricity</option>
                <option value="internet">Internet</option>
              </select>
              <input type="number" name="usage_units" value={editData.usage_units} onChange={handleEditChange} className="w-full border px-3 py-2 rounded" required />
              <input type="number" name="amount_paid" value={editData.amount_paid} onChange={handleEditChange} className="w-full border px-3 py-2 rounded" required />
              <input type="text" name="bill_month" value={editData.bill_month} onChange={handleEditChange} className="w-full border px-3 py-2 rounded" required />
              <input type="date" name="paid_on" value={editData.paid_on?.split("T")[0]} onChange={handleEditChange} className="w-full border px-3 py-2 rounded" required />
              <textarea name="remarks" value={editData.remarks} onChange={handleEditChange} className="w-full border px-3 py-2 rounded" />

              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilityList;
