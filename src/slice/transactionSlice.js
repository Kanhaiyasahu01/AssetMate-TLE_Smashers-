import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientTransactions: [], // Stores the list of client transactions
  supplierTransactions: [], // Stores the list of supplier transactions
  isLoading: false, // Indicates if transactions are being fetched
  error: null, // Stores any errors that occur during fetch
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // Set client transactions
    setClientTransaction(state, action) {
      state.clientTransactions = action.payload;
    },
    // Set supplier transactions
    setSupplierTransaction(state, action) {
      state.supplierTransactions = action.payload;
    },
    // Delete client transaction by filtering out the deleted transaction from the state
    deleteClientTransactionSuccess(state, action) {
      state.clientTransactions = state.clientTransactions.filter(
        (transaction) => transaction._id !== action.payload
      );
    },
    // Delete supplier transaction by filtering out the deleted transaction from the state
    deleteSupplierTransactionSuccess(state, action) {
      state.supplierTransactions = state.supplierTransactions.filter(
        (transaction) => transaction._id !== action.payload
      );
    },
    // Set loading state
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    // Set error state
    setError(state, action) {
      state.error = action.payload;
    },
    // Clear error
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setClientTransaction,
  setSupplierTransaction,
  deleteClientTransactionSuccess,
  deleteSupplierTransactionSuccess,
  setLoading,
  setError,
  clearError,
} = transactionSlice.actions;

export default transactionSlice.reducer;
