import React, { useState, useEffect } from "react";
import { termsEndPoints } from "../services/apis";
import { apiConnector } from "../services/apiconnector";

const TermsForm = () => {
  const { CREATE, UPDATE, GET, DELETE } = termsEndPoints;

  const [termsData, setTermsData] = useState({
    delivery: "",
    paymentTerms: "",
    gst: "",
    packingForwarding: "",
    for: "",
    freightInsurance: "",
    validity: "",
  });
  const [existingTerms, setExistingTerms] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    fetchExistingTerms();
  }, []);

  // Fetch the existing terms
  const fetchExistingTerms = async () => {
    try {
      console.log("Before get")
      const response = await apiConnector("GET", GET);
      console.log("After get")
      console.log("print response",response);
      if (response.data.term) {
        setExistingTerms(response.data.term);
        setTermsData(response.data.term);
        setIsUpdateMode(true);
      }
    } catch (error) {
      console.error("Error fetching terms:", error.message);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTermsData({ ...termsData, [name]: value });
  };

  // Handle form submission for creating or updating terms
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdateMode) {
        // Update terms
        await apiConnector("PUT", `${UPDATE}/${existingTerms._id}`, termsData);
        alert("Terms updated successfully!");
      } else {
        // Create new terms
        await apiConnector("POST", CREATE, termsData);
        alert("Terms created successfully!");
      }
      fetchExistingTerms();
    } catch (error) {
      console.error("Error saving terms:", error);
      alert("Failed to save terms. Please try again.");
    }
  };

  // Handle delete terms
  const handleDelete = async () => {
    if (!existingTerms) return;
    try {
      await apiConnector("DELETE", `${DELETE}/${existingTerms._id}`);
      alert("Terms deleted successfully!");
      setExistingTerms(null);
      setTermsData({
        delivery: "",
        paymentTerms: "",
        gst: "",
        packingForwarding: "",
        for: "",
        freightInsurance: "",
        validity: "",
      });
      setIsUpdateMode(false);
    } catch (error) {
      console.error("Error deleting terms:", error);
      alert("Failed to delete terms. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isUpdateMode ? "Update Terms and Conditions" : "Create Terms and Conditions"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Delivery */}
          <div className="form-group flex flex-col">
            <label htmlFor="delivery" className="mb-2 text-gray-700 font-medium">Delivery</label>
            <input
              type="text"
              id="delivery"
              name="delivery"
              value={termsData.delivery}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter delivery terms"
              required
            />
          </div>

          {/* Payment Terms */}
          <div className="form-group flex flex-col">
            <label htmlFor="paymentTerms" className="mb-2 text-gray-700 font-medium">Payment Terms</label>
            <input
              type="text"
              id="paymentTerms"
              name="paymentTerms"
              value={termsData.paymentTerms}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter payment terms"
              required
            />
          </div>

          {/* GST */}
          <div className="form-group flex flex-col">
            <label htmlFor="gst" className="mb-2 text-gray-700 font-medium">GST</label>
            <input
              type="text"
              id="gst"
              name="gst"
              value={termsData.gst}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GST"
              required
            />
          </div>

          {/* Packing & Forwarding */}
          <div className="form-group flex flex-col">
            <label htmlFor="packingForwarding" className="mb-2 text-gray-700 font-medium">Packing & Forwarding</label>
            <input
              type="text"
              id="packingForwarding"
              name="packingForwarding"
              value={termsData.packingForwarding}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter packing & forwarding details"
            />
          </div>

          {/* F.O.R */}
          <div className="form-group flex flex-col">
            <label htmlFor="for" className="mb-2 text-gray-700 font-medium">F.O.R.</label>
            <input
              type="text"
              id="for"
              name="for"
              value={termsData.for}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter F.O.R details"
            />
          </div>

          {/* Freight & Insurance */}
          <div className="form-group flex flex-col">
            <label htmlFor="freightInsurance" className="mb-2 text-gray-700 font-medium">Freight & Insurance</label>
            <input
              type="text"
              id="freightInsurance"
              name="freightInsurance"
              value={termsData.freightInsurance}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter freight & insurance"
            />
          </div>

          {/* Validity */}
          <div className="form-group flex flex-col">
            <label htmlFor="validity" className="mb-2 text-gray-700 font-medium">Validity</label>
            <input
              type="text"
              id="validity"
              name="validity"
              value={termsData.validity}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter validity period"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isUpdateMode ? "Update Terms" : "Create Terms"}
          </button>
        </form>

        {existingTerms && (
          <div className="bg-gray-100 p-4 rounded-md mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Existing Terms</h2>
            <ul className="list-disc list-inside">
              <li><strong>Delivery:</strong> {existingTerms.delivery}</li>
              <li><strong>Payment Terms:</strong> {existingTerms.paymentTerms}</li>
              <li><strong>GST:</strong> {existingTerms.gst}</li>
              <li><strong>Packing & Forwarding:</strong> {existingTerms.packingForwarding || "N/A"}</li>
              <li><strong>F.O.R.:</strong> {existingTerms.for || "N/A"}</li>
              <li><strong>Freight & Insurance:</strong> {existingTerms.freightInsurance || "N/A"}</li>
              <li><strong>Validity:</strong> {existingTerms.validity}</li>
            </ul>

            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                onClick={handleDelete}
              >
                Delete Terms
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsForm;
