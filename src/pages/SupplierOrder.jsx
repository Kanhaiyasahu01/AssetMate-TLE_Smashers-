import React, { useState } from "react";
import { SupplierOrderForm } from "../components/SupplierOrderForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSupplierOrderService } from "../services/operations/supplier";

export const SupplierOrder = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth); // Assuming you're using token for authentication
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    supplier: "", // Supplier instead of client
    warehouse: "",
    reference: "",
    orderDate: "",
    orderDueDate: "",
    tax: 0,
    discount: 0,
    extraDiscount: 0,
    totalTax: 0,
    totalDiscount: 0,
    shipping: 0,
    grandTotal: 0,
    paymentOfTerms: "CASH",
    productList: [],
    isUpdateRequired: false, // Added field for update requirement
  });

  // This function will handle the final submission of the supplier order
  const submitHandler = () => {
    console.log("Final Form Data:", formData);

    const supplierOrderData = {
      supplier: formData.supplier, // Supplier-specific field
      warehouse: formData.warehouse,
      invoiceDetails: {
        reference: formData.reference,
        orderDate: formData.orderDate,
        orderDueDate: formData.orderDueDate,
      },
      productList: formData.productList.map((item) => ({
        product: item.productId, // Assuming productId comes from the ProductListForm
        quantity: item.quantity,
        priceAtOrder: item.priceAtOrder,
      })),
      totalTax: formData.totalTax || 0,
      totalDiscount: formData.totalDiscount || 0,
      shipping: formData.shipping || 0,
      extraDiscount: formData.extraDiscount || 0,
      grandTotal: formData.grandTotal,
      paymentOfTerms: formData.paymentOfTerms,
      isUpdateRequired: formData.isUpdateRequired, // Added this field for stock update
    };

    console.log("after formatting");
    console.log(supplierOrderData);

    // Dispatch supplier-specific service for creating the order
    dispatch(createSupplierOrderService(token, supplierOrderData, navigate));
  };

  return (
    <div>
      <div className="text-3xl text-left my-4">Create Supplier Order</div>
      <div>
        {/* Reuse SupplierOrderForm and pass formData, setFormData, and submitHandler */}
        <SupplierOrderForm formData={formData} setFormData={setFormData} onSubmit={submitHandler} />
      </div>
    </div>
  );
};
