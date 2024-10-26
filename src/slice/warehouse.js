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
    updateWarehouseProducts(state, action) {
      const { warehouseId, newProduct } = action.payload; // Destructure the action payload
      
      console.log("inside slice");
      console.log(warehouseId, newProduct);
      
      // Find the index of the warehouse by its ID
      const warehouseIndex = state.warehouses.findIndex(
        (warehouse) => warehouse._id === warehouseId
      );
    
      // If the warehouse exists, update its products
      if (warehouseIndex !== -1) {
        // Check if the new product already exists in the warehouse's products
        const existingProductIndex = state.warehouses[warehouseIndex].warehouseProducts.findIndex(
          (product) => product._id === newProduct._id
        );
    
        if (existingProductIndex !== -1) {
          // If the product exists, update it
          state.warehouses[warehouseIndex].warehouseProducts[existingProductIndex] = {
            ...state.warehouses[warehouseIndex].warehouseProducts[existingProductIndex],
            ...newProduct, // Merge the existing product data with the new updates
          };
        } else {
          // If the product doesn't exist, add the new product to the warehouse's products
          state.warehouses[warehouseIndex].warehouseProducts.push(newProduct);
        }
      } else {
        console.warn(`Warehouse with ID ${warehouseId} not found.`);
      }
    },
    pushUpdatedWarehouseAfterDeletingProduct(state, action) {
      const { updatedWarehouse } = action.payload;

      // Find the index of the warehouse that was updated
      const index = state.warehouses.findIndex(
        (warehouse) => warehouse._id === updatedWarehouse._id
      );

      if (index !== -1) {
        // Directly replace the old warehouse with the updated one
        state.warehouses[index] = updatedWarehouse;
      }
    },
    addProductToWarehouse(state, action) {
      const { warehouseId, newProduct } = action.payload; // Destructure the payload
      console.log("actions",action.payload);
      // Find the index of the warehouse by its ID
      const warehouseIndex = state.warehouses.findIndex(
        (warehouse) => warehouse._id === warehouseId
      );
    
      if (warehouseIndex !== -1) {
        // Push the new product into the warehouse's products
        state.warehouses[warehouseIndex].warehouseProducts.push(newProduct);
      } else {
        console.warn(`Warehouse with ID ${warehouseId} not found.`);
      }
    },
    
    deleteProductStore: (state, action) => {
      const { productId, warehouseId } = action.payload;
      console.log("Action payload in reducer:", action.payload); // Log payload received in reducer
      
      // Find the index of the warehouse that contains the product
      const warehouseIndex = state.warehouses.findIndex(
        (warehouse) => warehouse._id === warehouseId
      );
    console.log(warehouseIndex);
      if (warehouseIndex !== -1) {
        console.log("stte",state.warehouses);
        // Filter out the product that was deleted from the specific warehouse's products
        state.warehouses[warehouseIndex].warehouseProducts = state.warehouses[warehouseIndex].warehouseProducts.filter(
          (product) => product._id !== productId 
        );
    
        console.log("Updated warehouse products state:", state.warehouses[warehouseIndex].warehouseProducts); // Log updated state of the warehouse products
      } else {
        console.warn(`Warehouse with ID ${warehouseId} not found.`);
      }
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
  updateWarehouseProducts,
  deleteProductStore,
  pushUpdatedWarehouseAfterDeletingProduct,
  addProductToWarehouse

} = warehouseSlice.actions;

export default warehouseSlice.reducer;
