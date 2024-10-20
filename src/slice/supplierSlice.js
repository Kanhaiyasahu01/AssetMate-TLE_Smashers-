import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suppliers: [], // Store suppliers instead of clients
  loading: false,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    // Add a new supplier to the list
    addSupplier(state, action) {
      state.suppliers.push(action.payload);
    },
    // Update an existing supplier
    updateSupplier(state, action) {
      const index = state.suppliers.findIndex(
        (supplier) => supplier.id === action.payload.id
      );
      if (index !== -1) {
        state.suppliers[index] = action.payload;
      }
    },
    // Remove a supplier by ID
    deleteSupplier(state, action) {
      state.suppliers = state.suppliers.filter(
        (supplier) => supplier._id !== action.payload
      );
    },
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Fetch suppliers and set in state
    setSuppliers(state, action) {
      state.suppliers = action.payload;
    },
  },
});

// Exporting the actions and reducer
export const {
  addSupplier,
  updateSupplier,
  deleteSupplier,
  setLoading,
  setSuppliers,
} = supplierSlice.actions;

export default supplierSlice.reducer;
