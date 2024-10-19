import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersService,deleteOrderByIdService } from '../services/operations/client';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../components/common/ConfirmationModel';
export const ManageInvoice = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [orderToDelete, setOrderToDelete] = useState(null); // State to hold the order being deleted

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Fetch all orders and set them in both orders and filteredOrders
  useEffect(() => {
    dispatch(fetchAllOrdersService(token, setOrders));
  }, [dispatch, token]);

  // Automatically filter orders when any search field changes
  useEffect(() => {
    let filtered = orders;

    // Filter by client name
    if (clientName.trim() !== '') {
      filtered = filtered.filter((order) =>
        order.client.billingAddress.company
          .toLowerCase()
          .includes(clientName.toLowerCase())
      );
    }

    // Filter by invoice number (no conversion to lowercase)
    if (invoiceNumber.trim() !== '') {
      const cleanedInvoiceNumber = invoiceNumber.replace('INV-', '').trim(); // Clean input
      filtered = filtered.filter((order) =>
        order.invoiceDetails.invoiceNumber
          .replace('INV-', '')
          .includes(cleanedInvoiceNumber)
      );
    }

    // Filter by date range
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    // Set the end of the day for the toDateObj
    if (toDateObj) {
      toDateObj.setHours(23, 59, 59, 999); // Set time to the end of the day
    }

    filtered = filtered.filter((order) => {
      const orderDate = new Date(order.createdAt);

      // Compare only the date part (no time)
      const isAfterFromDate = fromDateObj ? orderDate >= fromDateObj : true;
      const isBeforeToDate = toDateObj ? orderDate <= toDateObj : true;

      return isAfterFromDate && isBeforeToDate;
    });

    setFilteredOrders(filtered);
  }, [clientName, invoiceNumber, fromDate, toDate, orders]);

  const handleViewOrder = (orderId) => {
    console.log(`Viewing order ${orderId}`);
    navigate(`/sales/viewOrder/${orderId}`);
  };

  const openDeleteModal = (orderId, clientId) => {
    setOrderToDelete({ orderId, clientId }); // Store the order info for deletion
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleDeleteOrder = async () => {
    if (orderToDelete) {
      const { orderId, clientId } = orderToDelete;
      try {
        const formData = {
          orderId,
          clientId
        };
        await dispatch(deleteOrderByIdService(token, formData));

        // Update UI to remove the deleted order
        setFilteredOrders((prev) => prev.filter((order) => order._id !== orderId));
        setOrders((prev) => prev.filter((order) => order._id !== orderId)); // Ensure the deleted order is also removed from the original list
        console.log(`Deleted order ${orderId}`);
      } catch (error) {
        console.error(`Failed to delete order ${orderId}:`, error);
        // Optionally, display an error message to the user
      }
      setIsModalOpen(false); // Close the modal after deletion
      setOrderToDelete(null); // Reset the order info
    }
  };

  return (
    <div className="manage-invoice-container p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Sales Invoices</h1>

      {/* Add new invoice button */}
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Invoice
        </button>
      </div>

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
          <label className="block mb-2 font-semibold">Invoice Number</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="Format: INV-1729332464241"
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Orders table */}
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
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{order.client.billingAddress.company}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
                <td className="border px-4 py-2">{order.grandTotal}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    onClick={() => handleViewOrder(order._id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => openDeleteModal(order._id, order.client._id)} // Open modal with order details
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center border px-4 py-2">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
        onConfirm={handleDeleteOrder}
        onCancel={() => setIsModalOpen(false)} // Close the modal without action
      />
    </div>
  );
};
