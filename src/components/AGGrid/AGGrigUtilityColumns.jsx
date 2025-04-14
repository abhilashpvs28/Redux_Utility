export const getUtiltiyColumns = (onEdit, onDelete) => [
  {headerName:"S.no." , valueGetter: "node.rowIndex + 1", width:80, pinned:"left" , cellStyle: {textAlign : "center"}},
    { headerName: "Type", field: "type", sortable: true, filter: true },
    { headerName: "Usage Units", field: "usage_units", sortable: true },
    { headerName: "Amount Paid", field: "amount_paid", sortable: true },
    { headerName: "Bill Month", field: "bill_month" },
    { headerName: "Paid On", field: "paid_on" },
    { headerName: "Remarks", field: "remarks" },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => onEdit(params.data)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => onDelete(params.data.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]