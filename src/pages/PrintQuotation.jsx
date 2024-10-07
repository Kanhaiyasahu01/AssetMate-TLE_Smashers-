import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuotationService } from '../services/operations/client';

// Quotation component that forwards the ref
export const PrintQuotation = forwardRef((props, ref) => {
  const { id } = useParams(); // Extract id from URL params
  const { token } = useSelector((state) => state.auth); // Get the token from the Redux store
  const dispatch = useDispatch();
  const [quotationData, setQuotationData] = useState(null); // Correct useState declaration

  // Fetch quotation data when the component mounts or when id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchQuotationService(token, id, setQuotationData));
    }
  }, [id, token, dispatch]); // Add dependencies to re-fetch if these change

  return (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '800px', margin: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Vinayak Sales</h1>
        <p>Raipur Office: Beside Krishna Hardware, Shiv Mandir Chowk, Avant Vihar</p>
        <p>Bilaspur Office: Street No. 5, Jora Para, Bilaspur, Chhattisgarh</p>
        <hr />
      </div>

      {/* Check if quotationData is available before rendering */}
      {quotationData ? (
        <div>
          <h2>Quotation</h2>
          <p><strong>To:</strong> {quotationData.clientName}, <br />{quotationData.clientAddress}</p>
          <p><strong>Quotation No:</strong> {quotationData.quotationNumber}</p>
          <p><strong>Date:</strong> {quotationData.date}</p>
          <hr />
          <table border="1" width="100%" cellPadding="10">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Description</th>
                <th>UOM</th>
                <th>Net Price/UOM</th>
              </tr>
            </thead>
            <tbody>
              {quotationData.productList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p><strong>Delivery:</strong> {quotationData.deliveryTime}</p>
            <p><strong>Payment Terms:</strong> {quotationData.paymentTerms}</p>
          </div>
        </div>
      ) : (
        <p>Loading Quotation Data...</p>
      )}
    </div>
  );
});
