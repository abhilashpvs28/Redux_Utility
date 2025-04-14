import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUtilities,
  deleteUtility,
  updateUtility,
} from "../features/auth/utilityThunk";
import Modal from "../components/Modal";
import AGGridTable from "../components/AGGrid/AGGridTable";
import { getUtiltiyColumns } from "../components/AGGrid/AGGrigUtilityColumns";

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

  const columns = getUtiltiyColumns(
    (data) => {
      setEditData(data);
      setModalOpen(true);
    },
    (id) => {
      setDeleteId(id);
      setShowDeleteModal(true);
    }
  );

  const confirmDelete = () => {
    dispatch(deleteUtility({ id: deleteId }));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Columns to display in table



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Utilities List</h2>


          {/* AG Grid Table */}
          {loading ? <p>Loading</p> : <AGGridTable rowData={utilities} columnDefs={columns} />}
    

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
      {isModalOpen && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Utility</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              {/* Same input fields */}
              <select
                name="type"
                value={editData.type}
                onChange={handleEditChange}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Utility Type</option>
                <option value="water">Water</option>
                <option value="electricity">Electricity</option>
                <option value="internet">Internet</option>
              </select>
              <input
                type="number"
                name="usage_units"
                value={editData.usage_units}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                name="amount_paid"
                value={editData.amount_paid}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="bill_month"
                value={editData.bill_month}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="date"
                name="paid_on"
                value={editData.paid_on?.split("T")[0]}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                name="remarks"
                value={editData.remarks}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
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
