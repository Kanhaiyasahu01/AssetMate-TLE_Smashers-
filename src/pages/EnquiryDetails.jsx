import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import { getEnquiryService } from '../services/operations/enquiry';

export const EnquiryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [enquiry, setEnquiry] = useState(null);
  const componentRef = useRef(null);

  useEffect(() => {
    dispatch(getEnquiryService(token, id, setEnquiry));
  }, [token, id, dispatch]);

  const handlePrint = () => {
    const printContent = componentRef.current.cloneNode(true);
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Enquiry</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            .details-container { margin: 20px auto; padding: 20px; max-width: 600px; border: 1px solid #ddd; border-radius: 8px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .table th { background-color: #f2f2f2; }
            .note { margin-top: 20px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  const handleDownloadPdf = () => {
    const opt = {
      margin: [0.5, 0.5, 1, 0.5], // Extra bottom margin to prevent cut-off
      filename: 'enquiry_details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true, scrollY: 0, scrollX: 0 }, // Removed height restriction
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }, // Switched back to 'a4'
    };
    
    html2pdf().from(componentRef.current).set(opt).save();
  };

  if (!enquiry) {
    return <p>Loading enquiry details...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className=" w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Enquiry Details</h2>
        <div ref={componentRef} className="details-container">
          <p className="text-lg font-medium"><strong>Plant Name:</strong> {enquiry.plantName}</p>
          <p className="text-lg font-medium"><strong>Contact Person:</strong> {enquiry.contactPerson}</p>
          <p className="text-lg font-medium"><strong>Created At:</strong> {new Date(enquiry.createdAt).toLocaleDateString()}</p>

          {/* Material Required Table */}
          <div className="mt-6">
            <strong className="block text-lg font-medium mb-2">Material Required:</strong>
            {enquiry.materialRequired && enquiry.materialRequired.length > 0 ? (
              <table className="table min-w-full border border-gray-300 rounded">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold">Material Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiry.materialRequired.map((material, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4">{material.name}</td>
                      <td className="py-3 px-4">{material.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No material required specified.</p>
            )}
          </div>

          {/* Terms and Conditions List */}
          <div className="mt-6">
            <strong className="block text-lg font-medium mb-2">Terms and Conditions:</strong>
            {enquiry.termsAndConditions && enquiry.termsAndConditions.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {enquiry.termsAndConditions.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No terms and conditions specified.</p>
            )}
          </div>

          {/* Note */}
          {enquiry.note && (
            <div className="note mt-6">
              <strong className="block text-lg font-medium">Note:</strong>
              <p className="text-gray-700">{enquiry.note}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button 
            onClick={handlePrint} 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
          >
            Print Enquiry
          </button>
          <button 
            onClick={handleDownloadPdf} 
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};
