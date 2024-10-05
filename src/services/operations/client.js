import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setClients, setLoading } from "../../slice/clientSlice";
import { clientEndPoints } from "../apis"


const {
    ADD_CLIENT,
    ADDITIONAL_DETAILS,
    BILLING_ADDRESS,
    SHIPPING_ADDRESS,
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
