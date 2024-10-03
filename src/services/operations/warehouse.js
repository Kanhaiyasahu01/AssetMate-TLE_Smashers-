import { apiConnector } from "../apiconnector";
import { warehouseEndpoints } from "../apis";
import {toast} from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addWarehouse, setLoading } from "../../slice/warehouse"; // Import actions


import { setWarehouses } from "../../slice/warehouse"; // Import actions


const {
    ADD_WAREHOUSE,
    GET_WAREHOUSES,
} = warehouseEndpoints


export const addWarehouseService = (formData, navigate,token) => {
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
      dispatch(addWarehouse(response.data.warehouse));

      // Show success message
      toast.success("Warehouse created successfully");

      // Navigate to manage-warehouse page
      navigate("stock/manage-warehouse");
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
      const response = await apiConnector.get("GET",GET_WAREHOUSES,null,{
        Authorization: `Bearer ${token}`
    }); // Replace with your API call
      dispatch(setWarehouses(response.data)); // Set fetched warehouses in store
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
      const response = await apiConnector.get("POST",ADD_NEW_PRODUCT,formData,{
        Authorization: `Bearer ${token}`
    }); // Replace with your API call


    // i am confused here
      dispatch(setWarehouses(response.data.product)); 
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      toast.error("Failed to fetch warehouses");
    } finally {
      dispatch(setLoading(false));
    }
  };
};



