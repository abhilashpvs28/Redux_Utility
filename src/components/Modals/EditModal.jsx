export const EditModal = ({ show, onClose, onSubmit, editData, onChange }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Edit Utility</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <select
              name="type"
              value={editData.type}
              onChange={onChange}
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
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="number"
              name="amount_paid"
              value={editData.amount_paid}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              name="bill_month"
              value={editData.bill_month}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="date"
              name="paid_on"
              value={editData.paid_on?.split("T")[0]}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="remarks"
              value={editData.remarks}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Remarks"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };