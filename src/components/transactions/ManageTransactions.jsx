import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmationModal } from '../common/ConfirmationModel';
import { deleteClientTransaction,deleteSupplierTransaction } from '../../services/operations/accounts';
export const ManageTransactions = ({ transactions, isSupplier }) => {
  console.log("supplier",isSupplier);
  // States for search inputs
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [selectedTransactionId, setSelectedTransactionId] = useState(null); // Selected transaction ID for deletion
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  // Filter transactions based on search inputs
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesName = transaction.careOf?.billingAddress?.company
      ?.toLowerCase()
      .includes(searchName.toLowerCase());

    const matchesDate = searchDate
      ? new Date(transaction.date).toLocaleDateString() ===
        new Date(searchDate).toLocaleDateString()
      : true;

    return matchesName && matchesDate;
  });

  const handleDelete = (transactionId) => {
    console.log("id",transactionId);
    if (isSupplier) {
      dispatch(deleteSupplierTransaction(token,transactionId));
    } else {

      dispatch(deleteClientTransaction(token,transactionId));
    }
    setIsModalOpen(false); // Close modal after deletion
  };

  const openModal = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId(null);
  };

  const confirmDelete = () => {
    if (selectedTransactionId) {
      handleDelete(selectedTransactionId); // Pass the transaction ID to delete
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      {/* Search Inputs */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Care Of</th>
              <th className="px-4 py-2 border">To Account</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Transaction Type</th>
              <th className="px-4 py-2 border">Method</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-t">
                  <td className="px-4 py-2 border">
                    {transaction.careOf?.billingAddress?.company || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">
                    {transaction.toAccount?.name || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">{transaction.amount}</td>
                  <td className="px-4 py-2 border">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    {transaction.transactionType}
                  </td>
                  <td className="px-4 py-2 border">{transaction.method}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => openModal(transaction._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete this transaction?`}
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />
    </div>
  );
};
