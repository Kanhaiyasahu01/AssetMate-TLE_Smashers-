import React, { useEffect, useState } from "react";
import Select from "react-select"; // Import react-select
import {
  addPlantClientService,
  fetchClientsService,
} from "../services/operations/client";
import { useDispatch, useSelector } from "react-redux";

export const AddPlantClient = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { clients } = useSelector((state) => state.client);
  const dispatch = useDispatch();

  // Fetch clients on component mount
  useEffect(() => {
    if (clients.length === 0) {
      dispatch(fetchClientsService(token));
    }
    console.log("clients", clients);
  }, [dispatch, token, clients.length]);

  const [formData, setFormData] = useState({
    personName: "",
    designation: "",
    plantName: "",
    department: "",
    email: "",
    mobileNo: "",
    alternateMoNo: "",
    landlineNumber: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      plantName: selectedOption.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(addPlantClientService(token, formData));

      // Reset form fields after successful submission
      setFormData({
        personName: "",
        designation: "",
        department: "",
        email: "",
        mobileNo: "",
        alternateMoNo: "",
        landlineNumber: "",
        remarks: "",
      });
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Format clients data for react-select
  const clientOptions = clients.map((client) => ({
    value: client._id,
    label: client.billingAddress.name,
  }));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        {/* Heading Card */}
        <div className="w-full bg-blue-100 shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Add Client
          </h2>
        </div>

        {/* Form Fields Card */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Person Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Person Name
              </label>
              <input
                type="text"
                name="personName"
                value={formData.personName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Designation */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Plant Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Plant Name
              </label>
              <Select
                options={clientOptions}
                onChange={handleDropdownChange}
                placeholder="Select Plant Name"
                className="mt-1"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "1px solid black", // Black border
                  }),
                }}
              />
            </div>

            {/* Department */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Mobile No */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mobile No
              </label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Alternate Mobile No */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Alternate Mobile No
              </label>
              <input
                type="text"
                name="alternateMoNo"
                value={formData.alternateMoNo}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Landline Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Landline Number
              </label>
              <input
                type="text"
                name="landlineNumber"
                value={formData.landlineNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Remarks */}
            <div className="mb-4 col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Remarks
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-blue-500 w-full text-white px-4 py-2 rounded float-right ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
