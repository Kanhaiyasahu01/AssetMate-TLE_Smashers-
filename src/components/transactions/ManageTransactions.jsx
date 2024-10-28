import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmationModal } from '../common/ConfirmationModel';
import { deleteClientTransaction, deleteSupplierTransaction } from '../../services/operations/accounts';

export const ManageTransactions = ({ transactions, isSupplier }) => {
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesName = transaction.careOf?.billingAddress?.company?.toLowerCase().includes(searchName.toLowerCase());
    const matchesDate = searchDate ? new Date(transaction.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString() : true;
    return matchesName && matchesDate;
  });

  const handleDelete = () => {
    const deleteAction = isSupplier ? deleteSupplierTransaction : deleteClientTransaction;
    if (selectedTransactionId) {
      dispatch(deleteAction(token, selectedTransactionId));
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 border rounded mr-2 mb-4 md:mb-0 w-full md:w-auto"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {['Care Of', 'To Account', 'Amount', 'Date', 'Transaction Type', 'Method', 'Action'].map((heading) => (
                  <th key={heading} className="px-4 py-2 border">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length ? filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border">{transaction.careOf?.billingAddress?.company || 'N/A'}</td>
                  <td className="px-4 py-2 border">{transaction.toAccount?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">{transaction.amount}</td>
                  <td className="px-4 py-2 border">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{transaction.transactionType}</td>
                  <td className="px-4 py-2 border">{transaction.method}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => { setSelectedTransactionId(transaction._id); setIsModalOpen(true); }}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this transaction?"
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
