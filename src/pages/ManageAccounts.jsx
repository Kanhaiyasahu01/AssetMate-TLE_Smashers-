import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountsService ,deleteAccountService} from '../services/operations/accounts';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../components/common/ConfirmationModel';

export const ManageAccounts = () => {
  const { token } = useSelector(state => state.auth);
  const { accounts } = useSelector(state => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  useEffect(() => {
    if (accounts.length === 0) {
      dispatch(fetchAccountsService(token));
    }
  }, [dispatch, token, accounts.length]);

  const handleDelete = (accountId) => {
    setSelectedAccountId(accountId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAccountService(token, selectedAccountId));
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedAccountId(null);
  };

  const handleView = (account) => {
    // Pass the account object in the state when navigating
    navigate(`/accounts/${account._id}`, { state: { account } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Accounts</h1>
      {accounts.length === 0 ? (
        <p>No accounts available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 p-3 text-left">Account No</th>
                <th className="border-b-2 border-gray-300 p-3 text-left">Name</th>
                <th className="border-b-2 border-gray-300 p-3 text-left">Balance</th>
                <th className="border-b-2 border-gray-300 p-3 text-left">Account Type</th>
                <th className="border-b-2 border-gray-300 p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account._id}>
                  <td className="border-b p-3">{account.accountNo}</td>
                  <td className="border-b p-3">{account.name}</td>
                  <td className="border-b p-3">{account.balance.toFixed(2)}</td>
                  <td className="border-b p-3">{account.accountType}</td>
                  <td className="border-b p-3 flex space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      onClick={() => handleView(account)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(account._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this account?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};
