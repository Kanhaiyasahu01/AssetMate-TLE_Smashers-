import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slice/authSlice"
import profileReducer from "../slice/profileSlice";
import warehouseReducer from "../slice/warehouse";

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    warehouse:warehouseReducer,
})

export default rootReducer