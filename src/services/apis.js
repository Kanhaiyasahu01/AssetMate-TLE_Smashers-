const BASE_URL = import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: `${BASE_URL}/auth/sendotp`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`,
};


export const warehouseEndpoints={
    ADD_WAREHOUSE:`${BASE_URL}/warehouse/create`,
    GET_WAREHOUSES:`${BASE_URL}/warehouse/all`,
    ADD_NEW_PRODUCT:`${BASE_URL}/warehouse/add-product`,
}