import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addClientService } from "../services/operations/client";

export const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { clients } = useSelector((state) => state.client);
  console.log("clients",clients);
  const { id } = useParams(); // Use useParams to get the route parameter
  // State Management
  const [billingAddress, setBillingAddress] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postbox: "",
    gstNo: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postbox: "",
    gstNo: "",
  });

  const [additionalDetails, setAdditionalDetails] = useState({
    customFields: [],
  });

  const [customField, setCustomField] = useState({ name: "", description: "" });
  const [activeTab, setActiveTab] = useState("billing");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch client data if `id` is present (for update)
      const clientToUpdate = clients.find((client) => client._id === id);
      console.log("client", clientToUpdate);
      
      if (clientToUpdate) {
        const tempBillingAddress = {
          name: clientToUpdate.billingAddress.name,
          company: clientToUpdate.billingAddress.company,
          email: clientToUpdate.billingAddress.email,
          phone: clientToUpdate.billingAddress.phone,
          address: clientToUpdate.billingAddress.address,
          city: clientToUpdate.billingAddress.city,
          state: clientToUpdate.billingAddress.state,
          country: clientToUpdate.billingAddress.country,
          postbox: clientToUpdate.billingAddress.postbox,
          gstNo: clientToUpdate.billingAddress.gstNo,
        };
  
        const tempShippingAddress = {
          name: clientToUpdate.shippingAddress.name,
          company: clientToUpdate.shippingAddress.company,
          email: clientToUpdate.shippingAddress.email,
          phone: clientToUpdate.shippingAddress.phone,
          address: clientToUpdate.shippingAddress.address,
          city: clientToUpdate.shippingAddress.city,
          state: clientToUpdate.shippingAddress.state,
          country: clientToUpdate.shippingAddress.country,
          postbox: clientToUpdate.shippingAddress.postbox,
          gstNo: clientToUpdate.shippingAddress.gstNo,
        };
  
        setBillingAddress(tempBillingAddress);
        setShippingAddress(tempShippingAddress);
        setAdditionalDetails(clientToUpdate.additionalDetails);
      }
    }
  }, [id, clients]);
  

  // Copy Billing Address to Shipping Address
  const copyBillingToShipping = () => {
    setShippingAddress({ ...billingAddress });
  };

  const handleBillingChange = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const addCustomField = () => {
    setAdditionalDetails({
      ...additionalDetails,
      customFields: [...additionalDetails.customFields, customField],
    });
    setCustomField({ name: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      billingAddress,
      shippingAddress,
      additionalDetails,
    };

    try {
      if (id) {
        // Update client
        await dispatch(updateClientService(token, id, formData));
      } else {
        // Add new client
        await dispatch(addClientService(token, clients, billingAddress, shippingAddress, additionalDetails, formData));
      }

      // Reset form after successful submission
      setBillingAddress({
        name: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postbox: "",
        gstNo: "",
      });
      setShippingAddress({
        name: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postbox: "",
        gstNo: "",
      });
      setAdditionalDetails({ customFields: [] });
      setActiveTab("billing");
    } catch (error) {
      console.error("Error submitting client details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full">
        <div className="text-3xl font-bold text-gray-800 mb-6">{id ? "Update Plant" : "Add Plant"}</div>

        {/* Tabs */}
        <div className="flex justify-between mb-6 w-full">
          {["billing", "shipping", "additional"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-300"
              } rounded`}
            >
              {tab === "billing"
                ? "Billing Address"
                : tab === "shipping"
                ? "Shipping Address"
                : "Additional Details"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Billing Address */}
          {activeTab === "billing" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Billing Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(billingAddress).map((key) => (
                  <div key={key}>
                    <label className="block font-semibold mb-1">
                      {key === "company"
                        ? "Plant Short Form"
                        : key === "postbox"
                        ? "Pincode"
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type={key === "email" ? "email" : "text"}
                      name={key}
                      placeholder={`Enter ${key}`}
                      value={billingAddress[key]}
                      onChange={handleBillingChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded float-right"
              >
                Next
              </button>
            </div>
          )}

          {/* Shipping Address */}
          {activeTab === "shipping" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Shipping Address</h3>
                <button
                  type="button"
                  onClick={copyBillingToShipping}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Copy Billing Address
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(shippingAddress).map((key) => (
                  <div key={key}>
                    <label className="block font-semibold mb-1">
                      {key === "company"
                        ? "Plant Short Form"
                        : key === "postbox"
                        ? "Pincode"
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type={key === "email" ? "email" : "text"}
                      name={key}
                      placeholder={`Enter ${key}`}
                      value={shippingAddress[key]}
                      onChange={handleShippingChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("additional")}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded float-right"
              >
                Next
              </button>
            </div>
          )}

          {/* Additional Details */}
          {activeTab === "additional" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Remark</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Field Name"
                    value={customField.name}
                    onChange={(e) => setCustomField({ ...customField, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Field Description"
                    value={customField.description}
                    onChange={(e) =>
                      setCustomField({ ...customField, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={addCustomField}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Field
                </button>
              </div>
              <div className="mt-4">
                {additionalDetails.customFields.length > 0 &&
                  additionalDetails.customFields.map((field, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded mb-2">
                      <strong>{field.name}</strong>: {field.description}
                    </div>
                  ))}
              </div>
              <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded float-right ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
