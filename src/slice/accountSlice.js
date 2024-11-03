import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accounts: [], // Stores the list of accounts
  loading: false, // Indicates the loading state
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount(state, action) {
      state.accounts.push(action.payload);
    },
    updateAccount(state, action) {
      const index = state.accounts.findIndex(
        (account) => account.id === action.payload.id
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    deleteAccount(state, action) {
      state.accounts = state.accounts.filter(
        (account) => account._id !== action.payload
      );
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setAccounts(state, action) {
      state.accounts = action.payload;
    },
    updateSale(state, action) {
      const { accountId, amount } = action.payload;
      const account = state.accounts.find((acc) => acc._id === accountId);
      if (account) {
        account.sale += Number(amount); // Ensure amount is treated as a number
      }
    },
    updateExpense(state, action) {
      const { accountId, amount } = action.payload;
      const account = state.accounts.find((acc) => acc._id === accountId);
      if (account) {
        account.expense += Number(amount); // Ensure amount is treated as a number
      }
    },
  },
});

export const {
  addAccount,
  updateAccount,
  deleteAccount,
  setLoading,
  setAccounts,
  updateSale,
  updateExpense,
} = accountSlice.actions;

export default accountSlice.reducer;