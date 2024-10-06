import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { PrintQuotation } from './PrintQuotation';

const PrintDownloadComponent = () => {
  const componentRef = useRef(null);  // Initialize the reference

  // Function to print the component
  const handlePrint = () => {
    const printContent = componentRef.current;
    const printWindow = window.open('', '', 'width=800,height=600'); // Open a new print window

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Quotation</title>
            <style>
              @media print {
                body {
                  font-family: Arial, sans-serif;
                }
              }
              table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 10px;
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}  <!-- Insert component content into the new window -->
          </body>
        </html>
      `);

      printWindow.document.close();  // Close the document stream
      printWindow.focus();           // Focus on the new window
      printWindow.print();           // Trigger the print dialog
      printWindow.close();           // Close the print window after printing
    } else {
      console.error('Failed to open print window.');
    }
  };

  // Function to download the component as PDF
  const handleDownloadPdf = () => {
    const element = componentRef.current;
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'quotation.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    if (element) {
      html2pdf().from(element).set(opt).save();
    } else {
      console.error('No component reference available for PDF generation.');
    }
  };

  return (
    <div>
      {/* Button to trigger print */}
      <div className="button-container" style={{ textAlign: 'center', margin: '20px' }}>
        <button onClick={handlePrint} style={{ marginRight: '10px' }}>Print Quotation</button>
        <button onClick={handleDownloadPdf}>Download as PDF</button>
      </div>
      
      {/* Render the PrintQuotation component and pass the ref */}
      <div ref={componentRef}>
        <PrintQuotation />
      </div>
    </div>
  );
};

export default PrintDownloadComponent;
