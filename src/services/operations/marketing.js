import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setMarketingUsers,setLoading } from "../../slice/marketingSlice";
import { marketingEndPoints } from "../apis";

const {
    GET_MARKETING_USERS,
    ADD_QUOTATION,
    GET_MARKETING_QUOTATION
} = marketingEndPoints


  export const getMarketingUsersService = (token) => {
    return async (dispatch) => {
      const toastId = toast.loading("Fetching Marketing Users...");
      try {
        const response = await apiConnector("GET", GET_MARKETING_USERS, null, {
          Authorization: `Bearer ${token}`,
        });

        console.log("response marketing", response);
        if (response?.data?.success) {
          dispatch(setMarketingUsers(response.data.marketingUsers));
        } else {
          throw new Error("Failed to get marketing users");
        }
      } catch (error) {
        console.error("Error fetching marketing users:", error);
      } finally {
        toast.dismiss(toastId);
      }
    };
  };
  

  export const addQuotationToMarketingUserService = (token, formData) => {
    return async (dispatch) => {
      const toastId = toast.loading("Adding Quotation to Marketing User...");
      try {
        const response = await apiConnector("PUT", ADD_QUOTATION, formData, {
          Authorization: `Bearer ${token}`,
        });
  
        if (response?.data?.success) {
          toast.success("Quotation added successfully to marketer!");
        } else {
          throw new Error("Failed to add quotation to marketing user");
        }
      } catch (error) {
        console.error("Error adding quotation to marketing user:", error);
        toast.error("Failed to add quotation to marketing user");
      } finally {
        toast.dismiss(toastId);
      }
    };
  };


export const fetchMarketingQuotations = (token,setMarketingQuotation) =>{
    return async(dispatch)=>{
      const toastId = toast.loading("Fetching Marketing Quotations...");
      try{
        const response = await apiConnector("GET", GET_MARKETING_QUOTATION, null, {
          Authorization: `Bearer ${token}`, 
        });
        console.log("Fetched quotation Data:", response);
  
        // Check if the response has the expected data
        if (!response?.data?.allQuotations) {
          throw new Error("Failed to get all orders");
        }
  
        // Set the fetched quotation data
        setMarketingQuotation(response.data.allQuotations);
      }catch(err){
        console.error("Error fetching quotations:", err);
      }
      finally{
        toast.dismiss(toastId)
      }
    }
  }