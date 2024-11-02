import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { PrintOrderComponent } from './PrintOrderComponent';

export const PrintOrder = () => {
  const componentRef = useRef(null);

  const handlePrint = () => {
    const printContent = componentRef.current.cloneNode(true);
    const printWindow = window.open('', '', 'width=800,height=600');

    if (printWindow) {
      const waitForImagesToLoad = (content, callback) => {
        const images = content.querySelectorAll('img');
        let loadedImagesCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
          callback();
          return;
        }

        images.forEach((img) => {
          img.onload = () => {
            loadedImagesCount++;
            if (loadedImagesCount === totalImages) {
              callback();
            }
          };
          img.onerror = () => {
            loadedImagesCount++;
            if (loadedImagesCount === totalImages) {
              callback();
            }
          };
        });
      };

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

      waitForImagesToLoad(printWindow.document, () => {
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      });
    } else {
      console.error('Failed to open print window.');
    }
  };

  const handleDownloadPdf = () => {
    const element = componentRef.current;
    const opt = {
      filename: 'order.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    if (element) {
      html2pdf().from(element).set(opt).save();
    } else {
      console.error('No component reference available for PDF generation.');
    }
  };

  return (
    <div>
      {/* Button container */}
      <div className="p-4 mb-4 w-full flex justify-center">
        <div className="w-[800px] bg-white shadow-xl p-6 rounded-lg">
          <div className="flex justify-center gap-4">
            <button 
              onClick={handlePrint} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Print Order
            </button>
            <button 
              onClick={handleDownloadPdf} 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Download as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Render the PrintOrderComponent with the ref */}
      <div ref={componentRef}>
        <PrintOrderComponent />
      </div>
    </div>
  );
};
