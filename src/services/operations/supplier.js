import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { supplierEndPoints } from "../apis";
import { setSuppliers,setLoading } from "../../slice/supplierSlice";

const {
    ADDITIONAL_DETAILS,
    BILLING_ADDRESS,
    SHIPPING_ADDRESS,
    ADD_SUPPLIER,
} = supplierEndPoints;

export const addSupplierService = (token, suppliers, billingAddress, shippingAddress, additionalDetails, formData, navigate) => {
    return async (dispatch) => {
      console.log("Inside add supplier service");
  
      const toastId = toast.loading("Loading...");  // Show loading toast
      dispatch(setLoading(true));
  
      try {
        // Step 1: Call backend API for billing address
        const billingResponse = await apiConnector("POST", BILLING_ADDRESS, billingAddress, {
          Authorization: `Bearer ${token}`,
        });
  
        console.log("After billing address", billingResponse);
  
        if (!billingResponse?.data?.address?._id) {
          throw new Error("Failed to create billing address");
        }
  
        const billingAddressId = billingResponse.data.address._id;
        console.log("Billing address created with ID:", billingAddressId);
  
        // Step 2: Call backend API for shipping address
        const shippingResponse = await apiConnector("POST", SHIPPING_ADDRESS, shippingAddress, {
          Authorization: `Bearer ${token}`,
        });
  
        if (!shippingResponse?.data?.address?._id) {
          throw new Error("Failed to create shipping address");
        }
  
        const shippingAddressId = shippingResponse.data.address._id;
        console.log("Shipping address created with ID:", shippingAddressId);
  
        // Step 3: Call backend API for additional details
        const additionalDetailsResponse = await apiConnector("POST", ADDITIONAL_DETAILS, additionalDetails, {
          Authorization: `Bearer ${token}`,
        });
  
        if (!additionalDetailsResponse?.data?.additionalDetails?._id) {
          throw new Error("Failed to create additional details");
        }
  
        const additionalDetailsId = additionalDetailsResponse.data.additionalDetails._id;
        console.log("Additional details created with ID:", additionalDetailsId);
  
        // Step 4: Call backend API to add the supplier using the collected IDs
        const supplierResponse = await apiConnector("POST", ADD_SUPPLIER, {
          billingAddress: billingAddressId,
          shippingAddress: shippingAddressId,
          additionalDetails: additionalDetailsId,
        }, {
          Authorization: `Bearer ${token}`,
        });
  
        if (!supplierResponse?.data?.supplier) {
          throw new Error("Failed to add supplier");
        }
  
        console.log("Supplier created successfully:", supplierResponse.data.supplier);
  
        // Step 5: Dispatch the supplier data to the store if there are suppliers
        if (suppliers.length > 0) {
          dispatch(setSuppliers([...suppliers, supplierResponse.data.supplier]));
        }
  
        // Show success toast and navigate to manage suppliers page
        toast.success("Supplier added successfully");
        navigate("/supplier/manage-supplier");
  
      } catch (error) {
        console.error("Error adding supplier:", error);
        toast.error("Failed to add supplier");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);  // Dismiss the loading toast
      }
    };
  };
  