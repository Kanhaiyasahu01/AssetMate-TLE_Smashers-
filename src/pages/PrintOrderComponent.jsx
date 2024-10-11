import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import invoiceHeader from "../assets/invoiceHeader.jpeg";
import invoiceFooter from "../assets/invoiceFooter.png";
import { apiConnector } from '../services/apiconnector';
import { termsEndPoints } from '../services/apis';
import { fetchOrderService } from '../services/operations/client';

export const PrintOrderComponent = forwardRef((props, ref) => {

  const { GET } = termsEndPoints;
  const { id } = useParams(); // Extract id from URL params
  const { token } = useSelector((state) => state.auth); // Get the token from the Redux store
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null); // State to store order data
  const [termsData, setTermsData] = useState(null);

  // Fetch order data when the component mounts or when id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchOrderService(token, id, setOrderData));
    }
  }, [id, token, dispatch]);

  // Fetch terms
  useEffect(() => {
    fetchExistingTerms();
  }, []);

  // Fetch the existing terms
  const fetchExistingTerms = async () => {
    try {
      const response = await apiConnector("GET", GET);
      if (response.data.term) {
        setTermsData(response.data.term);
      }
    } catch (error) {
      console.error("Error fetching terms:", error.message);
    }
  };

  // Check if orderData is null to show a loading state
  if (!orderData) {
    return <p>Loading Order Data...</p>;
  }

  return (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '800px', margin: 'auto', border: '1px solid #ccc' }}>
      {/* Invoice Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }} className='border w-full'>
        <img src={invoiceHeader} alt="Invoice Header" style={{ width: '100%' }} />
      </div>

      {/* Order Title */}
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Order</h2>

      {/* Client and Order Details Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* Client Billing Address on the Left */}
        <div style={{ width: '48%' }}>
          <p><strong>To:</strong></p>
          <p>{orderData.client?.billingAddress?.company || 'No company available'}</p>
          <p>{orderData.client?.billingAddress?.address || 'No Address available'}</p>
          <p>
            {orderData.client?.billingAddress?.city || 'City'}, 
            {orderData.client?.billingAddress?.country || 'Country'}, 
            {orderData.client?.billingAddress?.postbox || 'Postbox'}
          </p>
        </div>

        {/* Order Details on the Right */}
        <div style={{ width: '48%', textAlign: 'right' }}>
          <p><strong>Order Number:</strong> {orderData.invoiceDetails.invoiceNumber}</p>
          <p><strong>Order Date:</strong> {new Date(orderData.invoiceDetails.orderDate).toLocaleDateString()}</p>
        </div>
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
            {orderData.productList.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{index + 1}</td>
                <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>{item?.product?.name || 'No description'}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{item?.quantity}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{item?.product?.retailPrice}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{item?.product?.tax}</td>
                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ccc' }}>{item?.product?.discount}</td>
                <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ccc' }}>{item?.priceAtOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Terms and Conditions */}
      {termsData && (
        <div style={{ marginTop: '20px' }}>
          <h3><strong>Terms and Conditions:</strong></h3>
          <p><strong>1. Delivery:</strong> {termsData.delivery}</p>
          <p><strong>2. Payment Terms:</strong> {termsData.paymentTerms}</p>
          <p><strong>3. GST:</strong> {termsData.gst}</p>
          <p><strong>4. Packing & Forwarding:</strong> {termsData.packingForwarding || 'N/A'}</p>
          <p><strong>5. F.O.R:</strong> {termsData.for || 'N/A'}</p>
          <p><strong>6. Freight & Insurance:</strong> {termsData.freightInsurance || 'N/A'}</p>
          <p><strong>7. Validity:</strong> {termsData.validity}</p>
        </div>
      )}

      {/* Footer Note */}
      <p>We hope you find our offer in line with your requirement and that you will favor us with your valued purchase order.</p>

      {/* Invoice Footer */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <img src={invoiceFooter} alt="Invoice Footer" style={{ width: '100%' }} />
      </div>
    </div>
  );
});
