import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUtilities, deleteUtility, updateUtility } from "../features/auth/utilityThunk";
import ReusableTable from "../components/ReusableTable";
import { utilityTableColumns } from "../configs/tableColumns/utilityTableColumns";
import Loader from "../components/loader";
import { EditModal } from "../components/Modals/EditModal";
import { DeleteModal } from "../components/Modals/DeleteModal";
import useExcelExport from "../hooks/useExcelExport";
import useCsvExport from "../hooks/useCsvExport";
import { FaFileExcel, FaFileCsv } from "react-icons/fa";

const UtilityList = () => {
  const dispatch = useDispatch();
  const { utilities, loading } = useSelector((state) => state.utility);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getUtilities());
  }, [dispatch]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUtility(editData));
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteUtility({ id: deleteId }));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Define columns
  const columns = utilityTableColumns(
    (row) => {
      setEditData(row);
      setShowEditModal(true);
    },
    (row) => {
      setDeleteId(row._id);
      setShowDeleteModal(true);
    }
  );

  // Transform columns for CSV export
  const csvHeaders = columns
    .filter((col) => col.header !== "Actions")
    .map((col) => ({
      label: col.header,
      key: col.accessor || col.header.toLowerCase().replace(/\s/g, "_"),
    }));

  // Preprocess data for formatted paid_on
  const csvData = utilities.map((item) => ({
    ...item,
    paid_on: item.paid_on ? new Date(item.paid_on).toLocaleDateString() : "",
  }));

  const { tableRef, ExcelExportButton } = useExcelExport("utilities", "utilities");
  const { CsvExportButton } = useCsvExport(csvData, csvHeaders, "utilities.csv");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Utilities List</h2>

      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-700">Utilities List</h3>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded w-full md:w-1/4"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex justify-end mb-2 space-x-2">
            <ExcelExportButton />
            <CsvExportButton /> 
        </div>

        {loading ? (
          <Loader />
        ) : (
          <ReusableTable
            data={utilities}
            searchText={searchText}
            columns={columns}
            tableRef={tableRef}
          />
        )}
      </div>

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />

      <EditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        editData={editData}
        onChange={handleEditChange}
      />
    </div>
  );
};

export default UtilityList;