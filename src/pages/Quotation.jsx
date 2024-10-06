import React, { useState } from "react";
import { OrderForm } from "../components/common/OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import { createQuotationService } from "../services/operations/client";
import { useNavigate } from "react-router-dom";
export const Quotation = () => {
  // Lift the formData state up to the Quotation component
  const dispatch = useDispatch();
    const {token} = useSelector(state=>state.auth);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client: "",
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
  });

  // This function will handle the final submission of the quotation
  const submitHandler =  () => {
    console.log("Final Form Data:", formData);
    const clientOrderData = {
        client: formData.client,
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
        totalTax: formData.totalTax,
        totalDiscount: formData.totalDiscount,
        shipping: formData.shipping,
        extraDiscount: formData.extraDiscount,
        grandTotal: formData.grandTotal,
        paymentOfTerms: formData.paymentOfTerms,
      };


      console.log("after formating")
      console.log(clientOrderData);

    //   const createdQuotation = await dispatch(createQuotationService(token, clientOrderData));

    // if (createdQuotation) {
    //   // Navigate to another route to print/display the obtained data
    //   history.push(`/print-quotation/${createdQuotation._id}`); // Adjust this route based on your application
    // }
    // You can now call your API or dispatch an action here
    dispatch(createQuotationService(token, clientOrderData,navigate));
  };

  return (
    <div>
      <div className="text-3xl text-left my-4">Create Quotation</div>
      <div>
        {/* Pass formData, setFormData, and submitHandler as props to OrderForm */}
        <OrderForm formData={formData} setFormData={setFormData} onSubmit={submitHandler} />
      </div>
    </div>
  );
};
