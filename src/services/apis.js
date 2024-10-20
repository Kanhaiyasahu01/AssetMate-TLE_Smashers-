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
    UPDATE_WAREHOUSE:`${BASE_URL}/warehouse/update`,
    DELETE_WAREHOUSE:`${BASE_URL}/warehouse/delete`,
    UPDATE_PRODUCT:`${BASE_URL}/warehouse/update-product`,
    DELETE_PRODUCT:`${BASE_URL}/warehouse/delete-product`,
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
    GET_ORDER:`${BASE_URL}/client/get-client-invoice`,
    GET_ALL_ORDER:`${BASE_URL}/client/get-all-orders`,
    GET_ALL_QUOTATION:`${BASE_URL}/client/get-all-quotation`,
    DELETE_ORDER_ID:`${BASE_URL}/client/delete-order`,
    DELETE_QUOTATION_ID:`${BASE_URL}/client/delete-order`,
    DELETE_CLIENT:`${BASE_URL}/client/delete-client`,
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
    GET_ALL_SUPPLIERS:`${BASE_URL}/supplier/get-all-suppliers`,
    DELETE_SUPPLIER :`${BASE_URL}/supplier/delete-supplier`,
    GET_ALL_ORDER:`${BASE_URL}/supplier/get-all-orders`,
    DELETE_ORDER:`${BASE_URL}/supplier/delete-order`,
    GET_ORDER:`${BASE_URL}/supplier/get-order-details`,
}

export const accountsEndPoints={
    CREATE:`${BASE_URL}/account/create`,
    UPDATE:`${BASE_URL}/account/update`, // this will include id in api call
    GET_ACCOUNT:`${BASE_URL}/account/get-account`, // this willl also contain id
    GET_ALL_ACCOUNT:`${BASE_URL}/account/get-all-accounts`,
    CREATE_TRANSACTION:`${BASE_URL}/account/create-transaction`,
    DELETE_ACCOUNT:`${BASE_URL}/account/delete`,

}