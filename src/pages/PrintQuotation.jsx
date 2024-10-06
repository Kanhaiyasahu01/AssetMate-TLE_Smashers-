import React, { forwardRef } from 'react';

// Quotation component that forwards the ref
export const PrintQuotation = forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '800px', margin: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Vinayak Sales</h1>
        <p>Raipur Office: Beside Krishna Hardware, Shiv Mandir Chowk, Avant Vihar</p>
        <p>Bilaspur Office: Street No. 5, Jora Para, Bilaspur, Chhattisgarh</p>
        <hr />
      </div>
      <div>
        <h2>Quotation</h2>
        <p><strong>To:</strong> JAI BALAJI INDUSTRIES LIMITED, <br />Industrial Growth Centre, Borai</p>
        <p><strong>Quotation No:</strong> 006/JBI/VS/24-25</p>
        <p><strong>Date:</strong> 4-Apr-24</p>
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
            <tr>
              <td>1</td>
              <td>PBL MAKE GEARED MOTOR AMD25L (FOOT MOUNTED) Ratio 25:1 With 1.5 KW Motor</td>
              <td>NOS</td>
              <td>25545</td>
            </tr>
            <tr>
              <td>2</td>
              <td>PBL MAKE GEAR BOX AMD50L Ratio 50:1 With 1.5 KW Motor (ONLY GEAR BOX)</td>
              <td>NOS</td>
              <td>15997</td>
            </tr>
          </tbody>
        </table>
        <div>
          <p><strong>Delivery:</strong> 3-4 Weeks</p>
          <p><strong>Payment Terms:</strong> 100% advance</p>
        </div>
      </div>
    </div>
  );
});
