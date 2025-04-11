import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUtilities } from "../features/auth/utilityThunk";
import GenericChart from "../components/GenericChart";
import ReusableTable from "../components/ReusableTable";
import { formBillData } from "../utils/chartUtils";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { utilities, loading, error } = useSelector((state) => state.utility);

  useEffect(() => {
    dispatch(getUtilities());
  }, [dispatch]);

  const columns = [
    { key: "type", label: "Type" },
    { key: "usage_units", label: "Usage (units)" },
    { key: "amount_paid", label: "Amount Paid" },
    { key: "bill_month", label: "Month" },
    { key: "paid_on", label: "Paid On" },
    { key: "remarks", label: "Remarks" },
  ];

  const searchKeys = ["type", "bill_month", "remarks"];

  const transformedData = utilities?.map((item) => ({
    ...item,
    paid_on: new Date(item.paid_on).toLocaleDateString(),
  }));

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
            <h3 className="text-xl font-semibold mb-4 text-center text-green-700">Usage by Month</h3>
            <GenericChart
              type="bar"
              data={chartConfig.data}
              options={chartConfig.options}
            />
          </div>

          <div className="w-full md:w-1/2 bg-white shadow-md rounded-2xl p-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-center text-green-700">Usage Distribution</h3>
            <GenericChart
              type="pie"
              data={chartConfig.data}
              options={chartConfig.options}
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <ReusableTable
          data={transformedData}
          columns={columns}
          searchKeys={searchKeys}
          title="Utility Bill Details"
          fileName="utility-bills"
        />
      </div>
    </div>
  );
};

export default Dashboard;
