import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
  loading: false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    // Add a new client to the list
    addClient(state, action) {
      state.clients.push(action.payload);
    },
    // Update an existing client
    updateClient(state, action) {
      const index = state.clients.findIndex(
        (client) => client.id === action.payload.id
      );
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    // Remove a client by ID
    deleteClient(state, action) {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Fetch clients and set in state
    setClients(state, action) {
      state.clients = action.payload;
    },
  },
});

export const {
  addClient,
  updateClient,
  deleteClient,
  setLoading,
  setClients,
} = clientSlice.actions;

export default clientSlice.reducer;
