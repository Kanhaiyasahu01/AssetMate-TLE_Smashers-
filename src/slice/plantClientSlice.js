import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plantClients: [],
  loading: false, 
};

const plantClientSlice = createSlice({
  name: "plantClient",
  initialState,
  reducers: {
    // Set the array of plant clients
    setPlantClients(state, action) {
      state.plantClients = action.payload;
    },
    // Add a new plant client
    addPlantClient(state, action) {
      state.plantClients.push(action.payload);
    },
    // Modify (update) an existing plant client
    modifyPlantClient(state, action) {
      const updatedPlantClient = action.payload;
      const existingClientIndex = state.plantClients.findIndex(
        (client) => client.id === updatedPlantClient.id
      );

      if (existingClientIndex !== -1) {
        state.plantClients[existingClientIndex] = {
          ...state.plantClients[existingClientIndex],
          ...updatedPlantClient,
        };
      }
    },
    // Delete a plant client based on id
    deletePlantClient(state, action) {
      const clientId = action.payload;
      state.plantClients = state.plantClients.filter(
        (client) => client.id !== clientId
      );
    },
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setPlantClients,
  addPlantClient,
  modifyPlantClient,
  deletePlantClient,
  setLoading,
} = plantClientSlice.actions;

export default plantClientSlice.reducer;
