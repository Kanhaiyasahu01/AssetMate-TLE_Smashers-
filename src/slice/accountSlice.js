import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [], // Stores the list of accounts
  loading: false, // Indicates the loading state
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Add a new account to the list
    addAccount(state, action) {
      state.accounts.push(action.payload);
    },
    // Update an existing account by ID
    updateAccount(state, action) {
      const index = state.accounts.findIndex(
        (account) => account.id === action.payload.id
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    // Remove an account by ID
    deleteAccount(state, action) {
      state.accounts = state.accounts.filter(
        (account) => account._id !== action.payload
      );
    },
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Fetch accounts and set in state
    setAccounts(state, action) {
      state.accounts = action.payload;
    },
  },
});

export const {
  addAccount,
  updateAccount,
  deleteAccount,
  setLoading,
  setAccounts,
} = accountSlice.actions;

export default accountSlice.reducer;
