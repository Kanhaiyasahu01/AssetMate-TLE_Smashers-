import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TermsForm = () => {
  const { id } = useParams(); // Get the term ID from the URL params for updating an existing term
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Check if we're in update mode
  const [termsData, setTermsData] = useState({
    delivery: "",
    paymentTerms: "",
    gst: "",
    packingForwarding: "",
    for: "",
    freightInsurance: "",
    validity: "",
  });

  // If an ID is present, fetch the existing terms for update
  useEffect(() => {
    if (id) {
      setIsUpdateMode(true);
      fetchTermsById(id);
    }
  }, [id]);

  // Fetch terms data for a specific ID (update scenario)
  const fetchTermsById = async (id) => {
    try {
      const response = await axios.get(`/api/terms/${id}`);
      setTermsData(response.data.term);
    } catch (error) {
      console.error("Error fetching terms:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTermsData({
      ...termsData,
      [name]: value,
    });
  };

  // Submit the form to create or update the terms
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdateMode) {
        // Update existing terms
        await axios.put(`/api/terms/${id}`, termsData);
        alert("Terms updated successfully!");
      } else {
        // Create new terms
        await axios.post("/api/terms", termsData);
        alert("Terms created successfully!");
      }
    } catch (error) {
      console.error("Error saving terms:", error);
      alert("Failed to save terms. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>{isUpdateMode ? "Update Terms and Conditions" : "Create Terms and Conditions"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="delivery">Delivery</label>
          <input
            type="text"
            id="delivery"
            name="delivery"
            value={termsData.delivery}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentTerms">Payment Terms</label>
          <input
            type="text"
            id="paymentTerms"
            name="paymentTerms"
            value={termsData.paymentTerms}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gst">GST</label>
          <input
            type="text"
            id="gst"
            name="gst"
            value={termsData.gst}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="packingForwarding">Packing & Forwarding</label>
          <input
            type="text"
            id="packingForwarding"
            name="packingForwarding"
            value={termsData.packingForwarding}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="for">F.O.R.</label>
          <input
            type="text"
            id="for"
            name="for"
            value={termsData.for}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="freightInsurance">Freight & Insurance</label>
          <input
            type="text"
            id="freightInsurance"
            name="freightInsurance"
            value={termsData.freightInsurance}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="validity">Validity</label>
          <input
            type="text"
            id="validity"
            name="validity"
            value={termsData.validity}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {isUpdateMode ? "Update Terms" : "Create Terms"}
        </button>
      </form>
    </div>
  );
};

export default TermsForm;
