import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warehouses: [], // List of warehouses
  loading: false, // Loading state for async operations
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    // Add a new warehouse to the list
    addWarehouse(state, action) {
      state.warehouses.push(action.payload);
    },
    // Update an existing warehouse based on its ID
    updateWarehouse(state, action) {
      const warehouseId = action.payload.id; // Extract the warehouse ID from the payload
      const updatedData = action.payload.data; // Extract the updated data from the payload

      const index = state.warehouses.findIndex(
        (warehouse) => warehouse.id === warehouseId
      );

      // If the warehouse exists in the state, update it with the new data
      if (index !== -1) {
        state.warehouses[index] = {
          ...state.warehouses[index],
          ...updatedData, // Merge existing warehouse data with new updates
        };
      }
    },
    // Remove a warehouse by ID
    deleteWarehouse(state, action) {
      // Ensure the action payload is an ID string
      const warehouseId = action.payload;
      state.warehouses = state.warehouses.filter(
        (warehouse) => warehouse._id !== warehouseId // Use `_id` to match the warehouse ID
      );
    },
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Fetch warehouses and set in state
    setWarehouses(state, action) {
      state.warehouses = action.payload;
    },
  },
});

export const {
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
  setLoading,
  setWarehouses,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
