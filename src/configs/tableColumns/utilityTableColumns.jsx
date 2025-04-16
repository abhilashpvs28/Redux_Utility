export const utilityTableColumns = (handleEdit, handleDelete) => {
  const columns = [
    { header: "Type", accessor: "type" },
    { header: "Usage Units", accessor: "usage_units" },
    { header: "Amount Paid", accessor: "amount_paid" },
    { header: "Bill Month", accessor: "bill_month" },
    {
      header: "Paid On",
      accessor: "paid_on",
      render: (row) => new Date(row.paid_on).toLocaleDateString(),
    },
    { header: "Remarks", accessor: "remarks" },
  ];

  // Helper function to check if handler is not just a no-op
  const isValidHandler = (fn) =>
    typeof fn === "function" && fn.toString().replace(/\s/g, "") !== "()=>{}";

  if (isValidHandler(handleEdit) || isValidHandler(handleDelete)) {
    columns.push({
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          {isValidHandler(handleEdit) && (
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => handleEdit(row)}
            >
              Edit
            </button>
          )}
          {isValidHandler(handleDelete) && (
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(row)}
            >
              Delete
            </button>
          )}
        </div>
      ),
    });
  }

  return columns;
};
