import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUtilities } from "../features/auth/utilityThunk";
import GenericChart from "../components/GenericChart";
import { formBillData } from "../utils/chartUtils";
import AGGridTable from "../components/AGGrid/AGGridTable";
import { getUtiltiyColumns } from "../components/AGGrid/AGGrigUtilityColumns";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { utilities, loading, error } = useSelector((state) => state.utility);
  const [quickFilterText, setQuickFilterText] = useState("");

  useEffect(() => {
    dispatch(getUtilities());
  }, [dispatch]);

  const columns = getUtiltiyColumns(
    () => {}, // No edit in dashboard
    () => {} // No delete in dashboard
  );

  const chartConfig = utilities?.length ? formBillData(utilities) : null;

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

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
    <h3 className="text-xl font-semibold text-green-700">Utility Details Table</h3>
    <input
      type="text"
      placeholder="Search..."
      className="p-2 border rounded w-full md:w-1/4"
      value={quickFilterText}
      onChange={(e) => setQuickFilterText(e.target.value)}
    />
  </div>

  <AGGridTable rowData={utilities} columnDefs={columns} quickFilterText={quickFilterText} />
</div>
    </div>
  );
};

export default Dashboard;
