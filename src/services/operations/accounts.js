import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { accountsEndPoints } from "../apis";
import { setLoading } from "../../slice/authSlice";
import { deleteAccount, setAccounts } from "../../slice/accountSlice";
import { setClientTransaction, setSupplierTransaction } from "../../slice/transactionSlice";
import { deleteClientTransactionSuccess,deleteSupplierTransactionSuccess } from "../../slice/transactionSlice";
const {
    CREATE,
    GET_ALL_ACCOUNT,
    CREATE_TRANSACTION,
    DELETE_ACCOUNT,
    CLIENT_TRANSACTION,
    SUPPLIER_TRANSACTION,
    DELETE_CLIENT_TRANSACTION,
    DELETE_SUPPLIER_TRANSACTION
} = accountsEndPoints;

export const createAccountService = (token, formData, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Creating account...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CREATE, formData, {
                Authorization: `Bearer ${token}`,
            });

            // Log the response for debugging
            console.log("Create Account Response: ", response);

            if (response?.data?.success) {
                toast.success("Account Created Successfully");
                navigate('/accounts/manage-accounts'); // Redirect on success
            } else {
                // Handle specific error messages if provided by the API
                toast.error(response?.data?.message || "Failed to create account");
            }
        } catch (error) {
            // Log error for debugging
            console.error("Error creating account:", error);

            // Display error message
            toast.error("Error creating account, please try again later.");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId); // Dismiss the loading toast
        }
    };
};

export const fetchAccountsService = (token) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("GET", GET_ALL_ACCOUNT, null, {
          Authorization: `Bearer ${token}`,
        }); // Replace GET_ALL_ACCOUNT with your API endpoint for fetching accounts
  
        console.log(response);
        console.log("After response");
  
        if (response?.data?.accounts) {
          dispatch(setAccounts(response.data.accounts)); // Set fetched accounts in the store
          toast.success("Accounts fetched successfully");
        } else {
          toast.error("Failed to fetch accounts");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast.error("Failed to fetch accounts");
      } finally {
        dispatch(setLoading(false));
      }
    };
  };


export const createTransactionService = (token,formData)=>{
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", CREATE_TRANSACTION, formData, {
                Authorization: `Bearer ${token}`,
              }); 
            
              console.log("Create transaction Response: ", response);
              if(response?.data?.success){
                toast.success("Transaction added");
              }
              else{
                toast.error("Error while adding transaction");
              }
            
        }catch (error) {
            console.error("Error creating transaction:", error);
            toast.error("Failed to create transaction");
        } finally {
            dispatch(setLoading(false));
        }
    }
}


export const deleteAccountService = (token, accountId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", `${DELETE_ACCOUNT}/${accountId}`, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("Account deleted successfully: ", response);
      if (response?.data?.success) {
        // Dispatch action to remove the account from the state
        dispatch(deleteAccount(accountId));
        toast.success("Account deleted successfully");
      } else {
        toast.error("Error while deleting account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete the account");
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getClientTransactions = (token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading client transaction...")
    try {
      const response = await apiConnector("GET", CLIENT_TRANSACTION, null, {
        Authorization: `Bearer ${token}`,
      });

      if (response?.data?.success) {
        // Dispatch action to set client transactions in the Redux state
        if(response.data.allClientTransactions.length >0 )
          dispatch(setClientTransaction(response.data.allClientTransactions));
        else 
          toast.error("No client Transaction");
      } else {
        toast.error("Failed to fetch client transactions.");
      }
    } catch (error) {
      console.error("Error fetching client transactions:", error);
      toast.error("An error occurred while fetching client transactions.");
    } finally {
      toast.dismiss(toastId);
    }
  };
};

// Fetch Supplier Transactions
export const getSupplierTransactions = (token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading supplier transaction...")
    try {
      const response = await apiConnector("GET", SUPPLIER_TRANSACTION, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(response);

      if (response?.data?.success) {
        if(response.data.allSupplierTransactions.length>0)
          dispatch(setSupplierTransaction(response.data.allSupplierTransactions));
        else
          toast.error("Supplier transaction does not exists");
        // Dispatch action to set supplier transactions in the Redux state
      } 
    } catch (error) {
      console.error("Error fetching supplier transactions:", error);
      toast.error("An error occurred while fetching supplier transactions.");
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const deleteClientTransaction = (token, transactionId) => {
  console.log("servicec client id",transactionId);
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true before API call
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_CLIENT_TRANSACTION}/${transactionId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response?.data?.success) {
        // Dispatch action to update the Redux state after a successful delete
        dispatch(deleteClientTransactionSuccess(transactionId));
        toast.success("Client transaction deleted successfully.");
      } else {
        toast.error("Failed to delete client transaction.");
      }
    } catch (error) {
      console.error("Error deleting client transaction:", error);
      toast.error("An error occurred while deleting the client transaction.");
    } finally {
      dispatch(setLoading(false)); // Set loading to false after API call completion
    }
  };
};


export const deleteSupplierTransaction = (token, transactionId) => {
  console.log("servie supplier id",transactionId);
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading to true before API call
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_SUPPLIER_TRANSACTION}/${transactionId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response?.data?.success) {
        // Dispatch action to update the Redux state after a successful delete
        dispatch(deleteSupplierTransactionSuccess(transactionId));
        toast.success("Supplier transaction deleted successfully.");
      } else {
        toast.error("Failed to delete supplier transaction.");
      }
    } catch (error) {
      console.error("Error deleting supplier transaction:", error);
      toast.error("An error occurred while deleting the supplier transaction.");
    } finally {
      dispatch(setLoading(false)); // Set loading to false after API call completion
    }
  };
};
