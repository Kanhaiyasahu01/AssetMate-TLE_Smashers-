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


export const clientEndPoints = {
    BILLING_ADDRESS:`${BASE_URL}/supplier/address/create`,
    SHIPPING_ADDRESS:`${BASE_URL}/supplier/address/create`,
    ADDITIONAL_DETAILS:`${BASE_URL}/supplier/additional-details/create`,
    ADD_CLIENT:`${BASE_URL}/client/create`,
    GET_ALL_CLIENTS:`${BASE_URL}/client/get-all-clients`,
    CREATE_QUOTATION:`${BASE_URL}/client/create-quotation`,
    GET_QUOTATION:`${BASE_URL}/client/get-client-order`,
    CREATE_ORDER:`${BASE_URL}/client/create-client-order`,
    GET_ORDER:`${BASE_URL}/client/get-client-invoice`
}

export const termsEndPoints = {
    CREATE:`${BASE_URL}/terms/create-terms`,
    GET:`${BASE_URL}/terms/terms/get`,
    UPDATE:`${BASE_URL}/terms/terms`,
    DELETE:`${BASE_URL}/terms/terms`,
}


export const supplierEndPoints = {
    BILLING_ADDRESS:`${BASE_URL}/supplier/address/create`,
    SHIPPING_ADDRESS:`${BASE_URL}/supplier/address/create`,
    ADDITIONAL_DETAILS:`${BASE_URL}/supplier/additional-details/create`,
    ADD_SUPPLIER:`${BASE_URL}/supplier/create`,
    CREATE_SUPPLIER_ORDER:`${BASE_URL}/supplier/create-supplier-order`,
    GET_ALL_SUPPLIERS:`${BASE_URL}/supplier/get-all-suppliers`
}