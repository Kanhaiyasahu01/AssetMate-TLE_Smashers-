import { apiConnector } from "../apiconnector";
import { warehouseEndpoints } from "../apis";
import {toast} from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addWarehouse, setLoading } from "../../slice/warehouse"; // Import actions


import { setWarehouses ,updateWarehouse,deleteWarehouse} from "../../slice/warehouse"; // Import actions


const {
    ADD_WAREHOUSE,
    GET_WAREHOUSES,
    ADD_NEW_PRODUCT,
    UPDATE_WAREHOUSE,
    DELETE_WAREHOUSE,
} = warehouseEndpoints


export const addWarehouseService = (formData, navigate,token,warehouses) => {
  return async (dispatch) => {
    const toastId = toast.loading("Creating Warehouse..."); 
    dispatch(setLoading(true)); 

    try {
      // API call to add the warehouse
      const response = await apiConnector("POST", ADD_WAREHOUSE, formData,{
        Authorization: `Bearer ${token}`
    }); 
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch the addWarehouse action to update the Redux store
      if(warehouses.length> 0)
          dispatch(addWarehouse(response.data.warehouse));

      // Show success message
      toast.success("Warehouse created successfully");

      // Navigate to manage-warehouse page
      navigate("/stock/manage-warehouse");
    } catch (error) {
      console.error("Warehouse creation error:", error);
      toast.error("Failed to create warehouse");
    } finally {
      // Stop loading
      dispatch(setLoading(false));
      // Dismiss the loading toast
      toast.dismiss(toastId);
    }
  };
};



// services/warehouseService.js

export const fetchWarehousesService = (token) => {
  return async (dispatch) => {

    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET",GET_WAREHOUSES,null,{
        Authorization: `Bearer ${token}`

    }); // Replace with your API call
    console.log(response)
    console.log("AFter response")
      dispatch(setWarehouses(response.data.warehouses)); // Set fetched warehouses in store
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      toast.error("Failed to fetch warehouses");
    } finally {
      dispatch(setLoading(false));
    }
  };
};


export const addNewProduct = (formData,navigate,token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST",ADD_NEW_PRODUCT,formData,{
        Authorization: `Bearer ${token}`
    }); 


    // i am confused here
    if(response.data.success)
    {
      toast.success("Product added successfully");
      navigate('/stock/manage-product');
    }
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      toast.error("Failed to fetch warehouses");
    } finally {
      dispatch(setLoading(false));
    }
  };
};



// update warehouse.
// update warehouse service
export const updateWarehouseService = (token, formData) => {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Indicate loading state

    try {
      const response = await apiConnector(
        'PUT',
        UPDATE_WAREHOUSE,
        formData,
        { Authorization: `Bearer ${token}` } // Set the authorization header with the token
      );

      console.log("response", response);
      // Check if the response is successful
      if (response?.data?.success) {
        // Update the warehouse state with the returned warehouse ID and data
        dispatch(
          updateWarehouse({
            id: response.data?.warehouse_id, // Send the warehouse ID
            data: formData, // Send the updated data
          })
        );
        toast.success("Warehouse updated successfully!");
      } else {
        throw new Error("Failed to update warehouse");
      }
    } catch (error) {
      console.error("Error updating warehouse:", error);
      toast.error("Failed to update warehouse");
    } finally {
      dispatch(setLoading(false)); // End loading state
    }
  };
};



export const deleteWarehouseService = (token, warehouseId) => {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Indicate loading state
    console.log("Warehouse to delete:", warehouseId);

    try {
      const response = await apiConnector(
        'DELETE',
        DELETE_WAREHOUSE,
        { id: warehouseId }, // Pass the warehouse ID directly here
        { Authorization: `Bearer ${token}` } // Set the authorization header with the token
      );

      console.log("Response:", response);
      // Check if the response is successful
      if (response?.data?.success) {
        // Update the state by dispatching the deleteWarehouse action
        dispatch(deleteWarehouse(warehouseId)); // Dispatch the warehouse ID directly
        toast.success("Warehouse deleted successfully!");
      } else {
        throw new Error("Failed to delete warehouse");
      }
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      toast.error("Failed to delete warehouse");
    } finally {
      dispatch(setLoading(false)); // End loading state
    }
  };
};
