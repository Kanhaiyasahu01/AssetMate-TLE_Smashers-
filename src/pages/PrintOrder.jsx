import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { PrintOrderComponent } from './PrintOrderComponent';

export const PrintOrder = () => {
  const componentRef = useRef(null);  // Initialize the reference

  // Function to print the component
  const handlePrint = () => {
    const printContent = componentRef.current.cloneNode(true); // Clone the component content
    const printWindow = window.open('', '', 'width=800,height=600'); // Open a new print window

    if (printWindow) {
      // Function to handle image loading and ensure print happens after images are loaded
      const waitForImagesToLoad = (content, callback) => {
        const images = content.querySelectorAll('img');
        let loadedImagesCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
          callback();
          return;  // If no images, trigger print immediately
        }

        images.forEach((img) => {
          img.onload = () => {
            loadedImagesCount++;
            if (loadedImagesCount === totalImages) {
              callback();  // Trigger the callback once all images are loaded
            }
          };
          img.onerror = () => {
            loadedImagesCount++;
            if (loadedImagesCount === totalImages) {
              callback();  // Continue even if an image fails to load
            }
          };
        });
      };

      // Inject the content into the print window and wait for images to load
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Order</title>
            <style>
              @media print {
                body {
                  font-family: Arial, sans-serif;
                }
                img {
                  max-width: 100%;
                  height: auto;
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
            ${printContent.innerHTML}
          </body>
        </html>
      `);

      // Wait for images to load before triggering the print dialog
      waitForImagesToLoad(printWindow.document, () => {
        printWindow.document.close();  // Close the document stream
        printWindow.focus();           // Focus on the new window
        printWindow.print();           // Trigger the print dialog
        printWindow.close();           // Close the print window after printing
      });
    } else {
      console.error('Failed to open print window.');
    }
  };

  // Function to download the component as PDF
  const handleDownloadPdf = () => {
    const element = componentRef.current;
    const opt = {
      filename: 'order.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },  // Ensure high-quality rendering with CORS enabled for images
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },  // Adjusted for A4 paper
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
      <div className="flex justify-center space-x-4 my-5">
        <button 
          onClick={handlePrint} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Print Order
        </button>
        <button 
          onClick={handleDownloadPdf} 
          className="bg-caribbeangreen-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Download as PDF
        </button>
      </div>

      {/* Render the PrintOrderComponent and pass the ref */}
      <div ref={componentRef}>
        <PrintOrderComponent />
      </div>
    </div>
  );
};
