import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postUtility } from "../features/auth/utilityThunk";

const UtilityForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: "",
    usage_units: "",
    amount_paid: "",
    bill_month: "",
    paid_on: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      usage_units: Number(formData.usage_units),
      amount_paid: Number(formData.amount_paid),
    };

    try {
      await dispatch(postUtility(payload)).unwrap();
      toast.success("Utility added successfully!");
      setFormData({
        type: "",
        usage_units: "",
        amount_paid: "",
        bill_month: "",
        paid_on: "",
        remarks: "",
      });
    } catch (err) {
      toast.error("Failed to add utility",err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Utility</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Utility Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Type</option>
            <option value="water">Water</option>
            <option value="electricity">Electricity</option>
            <option value="internet">Internet</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Usage Units</label>
          <input
            type="number"
            name="usage_units"
            value={formData.usage_units}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., 120"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Amount Paid (INR)</label>
          <input
            type="number"
            name="amount_paid"
            value={formData.amount_paid}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., 1500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Bill Month</label>
          <input
            type="text"
            name="bill_month"
            value={formData.bill_month}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., March 2025"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Paid On</label>
          <input
            type="date"
            name="paid_on"
            value={formData.paid_on}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="Optional remarks"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UtilityForm;
