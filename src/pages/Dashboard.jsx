import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUtilities } from "../features/auth/utilityThunk";
import GenericChart from "../components/GenericChart";
import { formBillData } from "../utils/chartUtils";
import Loader from "../components/loader";
import ReusableTable from "../components/ReusableTable";
import { utilityTableColumns } from "../configs/tableColumns/utilityTableColumns";
import useExcelExport from "../hooks/useExcelExport";
import useCsvExport from "../hooks/useCsvExport";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { utilities, loading, error } = useSelector((state) => state.utility);
  const [searchText, setSearchText] = useState("");
  const [selectedUtility, setSelectedUtility] = useState("water");

  const handleUtilityChange = (e) => {
    setSelectedUtility(e.target.value);
  };

  useEffect(() => {
    dispatch(getUtilities({ navigate }));
  }, [dispatch, navigate]);

  const columns = utilityTableColumns(() => {}, () => {});
  const filteredUtilities = utilities?.filter((item) => item.type === selectedUtility);
  
  const chartConfig = filteredUtilities?.length ? formBillData(filteredUtilities) : null;

  // Transform columns for CSV export
  const csvHeaders = columns
    .filter((col) => col.header !== "Actions")
    .map((col) => ({
      label: col.header,
      key: col.accessor || col.header.toLowerCase().replace(/\s/g, "_"),
    }));

  // Optional: Preprocess data for formatted paid_on
  const csvData = filteredUtilities.map((item) => ({
    ...item,
    paid_on: new Date(item.paid_on).toLocaleDateString(),
  }));

  const { tableRef, ExcelExportButton } = useExcelExport("utilities", "utilities");
  const { CsvExportButton } = useCsvExport(csvData, csvHeaders, "utilities.csv");

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

      <div className="flex justify-center mb-6">
        <select
          value={selectedUtility}
          onChange={handleUtilityChange}
          className="p-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-green-700 font-medium"
        >
          <option value="electricity">Electricity</option>
          <option value="internet">Internet</option>
          <option value="water">Water</option>
        </select>
      </div>

      
      {chartConfig && (
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-10">
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-2xl p-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-center text-green-700">
              Usage by Month
            </h3>
            <GenericChart
              type="bar"
              data={chartConfig.data}
              options={chartConfig.options}
            />
          </div>

          <div className="w-full md:w-1/2 bg-white shadow-md rounded-2xl p-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-center text-green-700">
              Usage Distribution
            </h3>
            <GenericChart
              type="pie"
              data={chartConfig.data}
              options={chartConfig.options}
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-700">
            Utility Details Table
          </h3>
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

        <ReusableTable
          data={utilities}
          searchText={searchText}
          columns={columns}
          tableRef={tableRef}
        />
      </div>
    </div>
  );
};

export default Dashboard;