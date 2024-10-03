import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warehouses: [],
  loading: false,
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    // Add a new warehouse to the list
    addWarehouse(state, action) {
      state.warehouses.push(action.payload);
    },
    // Update an existing warehouse
    updateWarehouse(state, action) {
      const index = state.warehouses.findIndex(
        (warehouse) => warehouse.id === action.payload.id
      );
      if (index !== -1) {
        state.warehouses[index] = action.payload;
      }
    },
    // Remove a warehouse by ID
    deleteWarehouse(state, action) {
      state.warehouses = state.warehouses.filter(
        (warehouse) => warehouse.id !== action.payload
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
