import React, { useState, useEffect } from "react";
import { termsEndPoints } from "../services/apis";
import { apiConnector } from "../services/apiconnector";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const TermsForm = () => {
  const { CREATE, UPDATE, GET, DELETE } = termsEndPoints;
  const {token} = useSelector(state=> state.auth);
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

  const fetchExistingTerms = async () => {
    try {
      const response = await apiConnector("GET", GET,null,{
        Authorization: `Bearer ${token}`,
      });
      if (response.data.term) {
        setExistingTerms(response.data.term);
        setTermsData(response.data.term);
        setIsUpdateMode(true);
      }
    } catch (error) {
      console.error("Error fetching terms:", error.message);
      toast.error("Failed to fetch terms. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTermsData({ ...termsData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdateMode) {
        await apiConnector("PUT", `${UPDATE}/${existingTerms._id}`, termsData,{
          Authorization: `Bearer ${token}`,
        });
        toast.success("Terms updated successfully!");
      } else {
        await apiConnector("POST", CREATE, termsData,{
          Authorization: `Bearer ${token}`,
        });
        toast.success("Terms created successfully!");
      }

      // Fetch existing terms after successful create or update
      fetchExistingTerms();
    } catch (error) {
      console.error("Error saving terms:", error);
      toast.error("Failed to save terms. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!existingTerms) return;
    try {
      await apiConnector("DELETE", `${DELETE}/${existingTerms._id}`,null,{
        Authorization: `Bearer ${token}`,
      });
      toast.success("Terms deleted successfully!");
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
      toast.error("Failed to delete terms. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col w-full p-8 bg-white shadow-2xl rounded-lg mr-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isUpdateMode ? "Update Terms and Conditions" : "Create Terms and Conditions"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Delivery */}
          <div className="form-group flex flex-col">
            <label htmlFor="delivery" className="mb-2 text-gray-700 font-semibold">Delivery</label>
            <input
              type="text"
              id="delivery"
              name="delivery"
              value={termsData.delivery}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter delivery terms"
              required
            />
          </div>

          {/* Payment Terms */}
          <div className="form-group flex flex-col">
            <label htmlFor="paymentTerms" className="mb-2 text-gray-700 font-semibold">Payment Terms</label>
            <input
              type="text"
              id="paymentTerms"
              name="paymentTerms"
              value={termsData.paymentTerms}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter payment terms"
              required
            />
          </div>

          {/* GST */}
          <div className="form-group flex flex-col">
            <label htmlFor="gst" className="mb-2 text-gray-700 font-semibold">GST</label>
            <input
              type="text"
              id="gst"
              name="gst"
              value={termsData.gst}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter GST"
              required
            />
          </div>

          {/* Packing & Forwarding */}
          <div className="form-group flex flex-col">
            <label htmlFor="packingForwarding" className="mb-2 text-gray-700 font-semibold">Packing & Forwarding</label>
            <input
              type="text"
              id="packingForwarding"
              name="packingForwarding"
              value={termsData.packingForwarding}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter packing & forwarding details"
            />
          </div>

          {/* F.O.R */}
          <div className="form-group flex flex-col">
            <label htmlFor="for" className="mb-2 text-gray-700 font-semibold">F.O.R.</label>
            <input
              type="text"
              id="for"
              name="for"
              value={termsData.for}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter F.O.R details"
            />
          </div>

          {/* Freight & Insurance */}
          <div className="form-group flex flex-col">
            <label htmlFor="freightInsurance" className="mb-2 text-gray-700 font-semibold">Freight & Insurance</label>
            <input
              type="text"
              id="freightInsurance"
              name="freightInsurance"
              value={termsData.freightInsurance}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter freight & insurance"
            />
          </div>

          {/* Validity */}
          <div className="form-group flex flex-col">
            <label htmlFor="validity" className="mb-2 text-gray-700 font-semibold">Validity</label>
            <input
              type="text"
              id="validity"
              name="validity"
              value={termsData.validity}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter validity period"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-md focus:ring-4 focus:ring-purple-400 transition duration-300"
          >
            {isUpdateMode ? "Update Terms" : "Create Terms"}
          </button>
        </form>
      </div>

      <div className="flex-shrink-0 w-full max-w-sm p-8 bg-white shadow-2xl rounded-lg sticky top-0 h-full ml-4">
        {existingTerms ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Existing Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Delivery:</strong> {existingTerms.delivery}</li>
              <li><strong>Payment Terms:</strong> {existingTerms.paymentTerms}</li>
              <li><strong>GST:</strong> {existingTerms.gst}</li>
              <li><strong>Packing & Forwarding:</strong> {existingTerms.packingForwarding || "N/A"}</li>
              <li><strong>F.O.R.:</strong> {existingTerms.for || "N/A"}</li>
              <li><strong>Freight & Insurance:</strong> {existingTerms.freightInsurance || "N/A"}</li>
              <li><strong>Validity:</strong> {existingTerms.validity}</li>
            </ul>

            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md focus:ring-4 focus:ring-purple-400 transition duration-300"
                onClick={handleDelete}
              >
                Delete Terms
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-700">No existing terms available.</p>
        )}
      </div>
    </div>
  );
};

export default TermsForm;
