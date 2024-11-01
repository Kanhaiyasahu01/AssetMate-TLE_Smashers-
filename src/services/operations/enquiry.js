import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { enquiryEndPoints } from "../apis";

const {
    CREATE,
    GET_ALL_ENQUIRIES,
    GET_ENQUIRY,
    UPDATE
}  = enquiryEndPoints;

export const createEnquiryService = (token, enquiryData,navigate) => {
    console.log("inside service")
    return async (dispatch) => {
      const toastId = toast.loading("Creating enquiry...");
      try {
        console.log("call api");
        const response = await apiConnector("POST", CREATE, enquiryData, {
          Authorization: `Bearer ${token}`,
        });
        console.log("Enquiry created successfully:", response);
    
        // Check if the response has the expected data
        if (!response?.data?.success) {
          throw new Error("Failed to create the enquiry");
        }
        toast.success("Enquiry created successfully");
        navigate(`/sales/enquiries/view/${response.data.enquiry._id}`);
      } catch (error) {
        console.error("Error creating enquiry:", error);
        toast.error("Failed to create enquiry"); // Show error toast
      } finally {
        toast.dismiss(toastId);
      }
    };
  };

  export const getAllEnquiriesService = (token, setEnquiries) => {
    return async (dispatch) => {
      const toastId = toast.loading("Fetching enquiries...");
      try {
        const response = await apiConnector("GET", GET_ALL_ENQUIRIES, null, {
          Authorization: `Bearer ${token}`,
        });
  
        if (response?.data?.success) {
          setEnquiries(response.data.enquiries); // Set the enquiries data
          toast.success("Enquiries fetched successfully");
        } else {
          throw new Error("Failed to fetch enquiries");
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
        toast.error("Failed to fetch enquiries");
      } finally {
        toast.dismiss(toastId);
      }
    };
  };


  export const getEnquiryService = (token, id, setEnquiry) => {
   return async (dispatch) => {
      const toastId = toast.loading("Fetching enquiry...");
      try {
        const response = await apiConnector("GET", `${GET_ENQUIRY}/${id}`, null, {
          Authorization: `Bearer ${token}`,
        });
  
        if (response?.data?.success) {
          setEnquiry(response.data.enquiry); // Corrected to set a single enquiry
          toast.success("Enquiry fetched successfully");
        } else {
          throw new Error("Failed to fetch enquiry");
        }
      } catch (error) {
        console.error("Error fetching enquiry:", error);
        toast.error("Failed to fetch enquiry");
      } finally {
        toast.dismiss(toastId);
      }
    };
  };


  export const updateEnquiryService = (token, id, formData,navigate) => {
    return async (dispatch) => {
      const toastId = toast.loading("Updating enquiry...");
      try {
        const response = await apiConnector("PUT", `${UPDATE}/${id}`, formData, {
          Authorization: `Bearer ${token}`,
        });
  console.log("res",response);
        if (response?.data?.success) {

          toast.success("Enquiry updated successfully");
          navigate('/sales/manage-enquiry');
        } else {
          throw new Error(response?.data?.message || "Failed to update enquiry");
        }
      } catch (error) {
        console.error("Error updating enquiry:", error);
        toast.error(error.message || "Failed to update enquiry");
      } finally {
        toast.dismiss(toastId);
      }
    };
  };
  
   