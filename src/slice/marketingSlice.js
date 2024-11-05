import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  marketingUsers: [], // Stores the list of marketing users
  loading: false,     // Indicates the loading state
};

const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {
    setMarketingUsers(state, action) {
      state.marketingUsers = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload; 
    },
  },
});

export const { setMarketingUsers, setLoading } = marketingSlice.actions;
export default marketingSlice.reducer;
