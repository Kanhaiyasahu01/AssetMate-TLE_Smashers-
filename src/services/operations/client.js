import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setClients, setLoading } from "../../slice/clientSlice";
import { clientEndPoints } from "../apis"


const {
    ADD_CLIENT,
    ADDITIONAL_DETAILS,
    BILLING_ADDRESS,
    SHIPPING_ADDRESS,
    GET_ALL_CLIENTS,
    CREATE_QUOTATION,
} = clientEndPoints



// Add Client Service
export const addClientService = (token, clients, billingAddress, shippingAddress, additionalDetails,formData) => {
  return async (dispatch) => {
    console.log("inside add client service")
    // const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      // Step 1: Call backend API for billing address
      const billingResponse = await apiConnector("POST",BILLING_ADDRESS, billingAddress, {
        Authorization: `Bearer ${token}`,
      });
      console.log("after billing address",billingResponse)

      if (!billingResponse?.data?.address?._id) {
        throw new Error("Failed to create billing address");
      }
      const billingAddressId = billingResponse.data.address._id;
      console.log("Billing address created with ID:", billingAddressId);

      // Step 2: Call backend API for shipping address
      const shippingResponse = await apiConnector("POST", SHIPPING_ADDRESS, shippingAddress , {
        Authorization: `Bearer ${token}`,
      });

      if (!shippingResponse?.data?.address?._id) {
        throw new Error("Failed to create shipping address");
      }
      const shippingAddressId = shippingResponse.data.address._id;
      console.log("Shipping address created with ID:", shippingAddressId);

      // Step 3: Call backend API for additional details
      const additionalDetailsResponse = await apiConnector("POST", ADDITIONAL_DETAILS, additionalDetails , {
        Authorization: `Bearer ${token}`,
      });


      if (!additionalDetailsResponse?.data?.additionalDetails?._id) {
        throw new Error("Failed to create additional details");
      }
      const additionalDetailsId = additionalDetailsResponse.data.additionalDetails._id;
      console.log("Additional details created with ID:", additionalDetailsId);

      // Step 4: Call backend API to add the client using the collected IDs
      const clientResponse = await apiConnector("POST", ADD_CLIENT,{
        billingAddress: billingAddressId,
        shippingAddress: shippingAddressId,
        additionalDetails: additionalDetailsId,
      }, {
        Authorization: `Bearer ${token}`,
      });

      if (!clientResponse?.data?.client) {
        throw new Error("Failed to add client");
      }
      console.log("Client created successfully:", clientResponse.data.client);

      // Step 5: Dispatch the client data to the store if there are clients
      if (clients.length > 0) {
        dispatch(setClients([...clients, clientResponse.data.client]));
      }

      toast.success("Client added successfully");

    } catch (error) {
      console.error("Error adding client:", error);
      toast.error("Failed to add client");
      console.log(error.message)
    } finally {
      dispatch(setLoading(false));
    }
  };
};


export const fetchClientsService = (token) => {
  return async (dispatch) => {

    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_CLIENTS, null, {
        Authorization: `Bearer ${token}`,
      }); // Replace GET_CLIENTS with your API endpoint for fetching clients
      
      console.log(response);
      console.log("After response");
      
      dispatch(setClients(response.data.clients)); // Set fetched clients in the store
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to fetch clients");
    } finally {
      dispatch(setLoading(false));
    }
  };
};


export const createQuotationService = (token, clientOrderData,navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading state
    try {
      // Make the API call to create a quotation
      const response = await apiConnector("POST", CREATE_QUOTATION, clientOrderData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Print response",response);
      // Check if the response has the expected data
      if (!response?.data?.quotation) {
        throw new Error("Failed to create quotation");
        
      }

      console.log("Quotation created successfully:", response.data.quotation);
      toast.success("Quotation created successfully");
      navigate("/sales/view");
      // Navigate to another route to display the obtained data (assuming you have a way to navigate)
      // You can use a navigation library like react-router-dom
      return response.data.quotation; // Return the created quotation for further use (e.g., navigation)
    } catch (error) {
      console.error("Error creating quotation:", error);
      toast.error("Failed to create quotation");
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };
};