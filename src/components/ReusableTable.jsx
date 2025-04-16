import React from "react";
import usePagination from "../hooks/usePagination";

const ReusableTable = ({ columns, data, searchText, itemsPerPage = 10, tableRef }) => {
  const filteredData = data.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(searchText.toLowerCase())
  );

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
  } = usePagination(filteredData, itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table
        ref={tableRef}
        className="min-w-full border text-sm text-left text-gray-700"
      >
        <thead className="bg-green-100">
          <tr>
            {Array.isArray(columns) &&
              columns.map((col, index) => (
                <th key={index} className="px-4 py-2 border-b">
                  {col.header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-green-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border-b">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-2 font-medium text-green-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;