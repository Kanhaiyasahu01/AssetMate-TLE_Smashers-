import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllOrdersService,
  deleteOrderByIdService,
  fetchAllQuotationsService,
  deleteQuotationByIdService,
} from '../../services/operations/client';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../common/ConfirmationModel';

export const ManageDocument = ({ type }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [documentNumber, setDocumentNumber] = useState(''); // Could be invoiceNumber or quotationNumber
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [documentToDelete, setDocumentToDelete] = useState(null); // State to hold the document being deleted

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Fetch all orders or quotations and set them in both documents and filteredDocuments
  useEffect(() => {
    if (type === 'invoice') {
      dispatch(fetchAllOrdersService(token, setDocuments));
    } else {
      dispatch(fetchAllQuotationsService(token, setDocuments));
    }
  }, [dispatch, token, type]);

  // Automatically filter documents when any search field changes
  useEffect(() => {
    let filtered = documents;

    // Filter by client name
    if (clientName.trim() !== '') {
      filtered = filtered.filter((document) =>
        document.client.billingAddress.company
          .toLowerCase()
          .includes(clientName.toLowerCase())
      );
    }

    // Filter by document number (invoice or quotation)
    if (documentNumber.trim() !== '') {
      const cleanedDocumentNumber = documentNumber
        .replace('INV-', '')
        .replace('QUO-', '')
        .trim(); // Clean input
      filtered = filtered.filter((document) => {
        const documentNum =
          document.documentDetails && document.documentDetails.documentNumber
            ? document.documentDetails.documentNumber.replace(
                type === 'invoice' ? 'INV-' : 'QUO-',
                ''
              )
            : '';

        return documentNum.includes(cleanedDocumentNumber);
      });
    }

    // Filter by date range
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    if (toDateObj) {
      toDateObj.setHours(23, 59, 59, 999); // Set time to the end of the day
    }

    filtered = filtered.filter((document) => {
      const documentDate = new Date(document.createdAt);

      const isAfterFromDate = fromDateObj ? documentDate >= fromDateObj : true;
      const isBeforeToDate = toDateObj ? documentDate <= toDateObj : true;

      return isAfterFromDate && isBeforeToDate;
    });

    setFilteredDocuments(filtered);
  }, [clientName, documentNumber, fromDate, toDate, documents, type]);

  const handleViewDocument = (documentId) => {
    navigate(
      `/${type === 'invoice' ? 'sales/viewOrder' : 'sales/view'}/${documentId}`
    );
  };

  const openDeleteModal = (documentId, clientId) => {
    setDocumentToDelete({ documentId, clientId }); // Store the document info for deletion
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleDeleteDocument = async () => {
    if (documentToDelete) {
      const { documentId, clientId } = documentToDelete;
      try {
        const formData = {
          orderId:documentId,
          clientId,
        };
        console.log("formData",formData);
        await dispatch(deleteOrderByIdService(token, formData));
        
        // Update UI to remove the deleted document
        setFilteredDocuments((prev) =>
          prev.filter((document) => document._id !== documentId)
        );
        setDocuments((prev) =>
          prev.filter((document) => document._id !== documentId)
        ); // Ensure the deleted document is also removed from the original list

        console.log(`Deleted ${type} ${documentId}`);
      } catch (error) {
        console.error(`Failed to delete ${type} ${documentId}:`, error);
        // Optionally, display an error message to the user
      }
      setIsModalOpen(false); // Close the modal after deletion
      setDocumentToDelete(null); // Reset the document info
    }
  };

  return (
    <div className="manage-document-container p-6">
      <h1 className="text-2xl font-bold mb-6">
        Manage {type === 'invoice' ? 'Invoices' : 'Quotations'}
      </h1>

      {/* Search form */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-2 font-semibold">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Search by Client Name"
            className="border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            {type === 'invoice' ? 'Invoice Number' : 'Quotation Number'}
          </label>
          <input
            type="text"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            placeholder={`Format: ${
              type === 'invoice' ? 'INV-' : 'QUO-'
            }1729332464241`}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Documents table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">S/N</th>
            <th className="border px-4 py-2">Client Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Total Amount</th>
            <th className="border px-4 py-2">Settings</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document, index) => (
              <tr key={document._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {document.client.billingAddress.company}
                </td>
                <td className="border px-4 py-2">
                  {new Date(document.createdAt).toLocaleDateString('en-US')}
                </td>
                <td className="border px-4 py-2">{document.grandTotal}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    onClick={() => handleViewDocument(document._id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() =>
                      openDeleteModal(document._id, document.client._id)
                    } // Open modal with document details
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center border px-4 py-2">
                No {type === 'invoice' ? 'invoices' : 'quotations'} found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title={`Delete ${type === 'invoice' ? 'Invoice' : 'Quotation'}`}
        message={`Are you sure you want to delete this ${
          type === 'invoice' ? 'invoice' : 'quotation'
        }? This action cannot be undone.`}
        onConfirm={handleDeleteDocument}
        onCancel={() => setIsModalOpen(false)} // Close the modal on cancel
      />
    </div>
  );
};
