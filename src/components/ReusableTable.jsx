import React from "react";
import useTableSearch from "../hooks/useTableSearch";
import usePagination from "../hooks/usePagination";
import { exporttoExcel,exportToCSV } from "../utils/exportUtils";


const ReusableTable = ({ data, columns, searchKeys, title = "", fileName = "export" }) => {
  const { searchTerm, setSearchTerm, filteredData } = useTableSearch(data, searchKeys);
  const { currentPage, setCurrentPage, totalPages, currentData } = usePagination(filteredData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        <div>
          <button
            onClick={() => exporttoExcel(filteredData, fileName)}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Export Excel
          </button>
          <button
            onClick={() => exportToCSV(filteredData, fileName)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>
      </div>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th key={col.key} className="border px-4 py-2 text-left">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {currentData.map((row, rowIndex) => (
      <tr key={row.id || rowIndex}>
        {columns.map((col) => (
          <td key={col.key} className="border px-4 py-2">
            {col.render ? col.render(row) : row[col.key]}
          </td>
        ))}
      </tr>
    ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-gray-300' : 'bg-white'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReusableTable;