import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuotationService } from '../services/operations/client';
import invoiceHeader from "../assets/invoiceHeader.jpeg";
import invoiceFooter from "../assets/invoiceFooter.png";

// Quotation component that forwards the ref
export const PrintQuotation = forwardRef((props, ref) => {
  const { id } = useParams(); // Extract id from URL params
  const { token } = useSelector((state) => state.auth); // Get the token from the Redux store
  const dispatch = useDispatch();
  const [quotationData, setQuotationData] = useState(null); // State to store quotation data

  // Fetch quotation data when the component mounts or when id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchQuotationService(token, id, setQuotationData));
    }
  }, [id, token, dispatch]);

  // Check if quotationData is null to show a loading state
  if (!quotationData) {
    return <p>Loading Quotation Data...</p>;
  }

  return (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '800px', margin: 'auto', border: '1px solid #ccc' }}>
      {/* Invoice Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={invoiceHeader} alt="Invoice Header" style={{ width: '100%' }} />
      </div>

      {/* Quotation Title */}
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Quotation</h2>

      {/* Client and Quotation Details Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* Client Billing Address on the Left */}
        <div style={{ width: '48%' }}>
          <p><strong>To:</strong></p>
          <p>{quotationData.client?.billingAddress?.company || 'No company available'}</p>
          <p>{quotationData.client?.billingAddress?.address || 'No Address available'}</p>
          <p>
            {quotationData.client?.billingAddress?.city || 'City'}, 
            {quotationData.client?.billingAddress?.country || 'Country'}, 
            {quotationData.client?.billingAddress?.postbox || 'Postbox'}
          </p>
        </div>

        {/* Quotation Details on the Right */}
        <div style={{ width: '48%', textAlign: 'right' }}>
          <p><strong>Quotation Number:</strong> {quotationData.invoiceDetails.invoiceNumber}</p>
          <p><strong>Quotation Date:</strong> {new Date(quotationData.invoiceDetails.orderDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Reference Section */}
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Ref:</strong> Through Mail</p>
        <p>Dear Sir,</p>
        <p>Thank you for your enquiry. We are pleased to quote you the following:</p>
      </div>

      {/* Product List Table */}
      <div style={{ marginBottom: '20px' }}>
        <table border="1" width="100%" cellPadding="10" cellSpacing="0" style={{ borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
              <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>S.No</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Product Name</th>
              <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Quantity</th>
              <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Price</th>
              <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Tax</th>
              <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>Discount</th>
              <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ccc' }}>Net Price/UOM</th>
            </tr>
          </thead>
          <tbody>
            {quotationData.productList.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{index + 1}</td>
                <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>{item?.product?.name || 'No description'}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{item?.quantity}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{item?.product?.retailPrice}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{item?.product?.tax }</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{item?.product?.discount}</td>
                <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ccc' }}>{item?.priceAtOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivery and Payment Terms */}
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Delivery:</strong> {quotationData.deliveryTime || 'N/A'}</p>
        <p><strong>Payment Terms:</strong> {quotationData.paymentOfTerms || 'N/A'}</p>
      </div>

      {/* Invoice Footer */}
      <div style={{ textAlign: 'center' }}>
        <img src={invoiceFooter} alt="Invoice Footer" style={{ width: '100%' }} />
      </div>
    </div>
  );
});
