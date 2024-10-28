import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountsService, deleteAccountService } from '../services/operations/accounts';
import { useNavigate } from 'react-router-dom';

export const ManageAccounts = () => {
  const { token } = useSelector((state) => state.auth);
  const { accounts, loading } = useSelector((state) => state.account);
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

  const handleView = (account) => {
    navigate(`/accounts/${account._id}`, { state: { account } });
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Card for Manage Accounts Title */}
      <div className="w-full bg-white shadow-xl p-6 mb-6 rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">Manage Accounts</h1>
        <p className="text-gray-500 text-center">Manage all registered accounts here</p>
      </div>

      {/* Card for Accounts Table */}
      <div className="bg-white shadow-lg p-6 rounded-lg min-h-[200px]">
        {/* Show Loading State within the Card */}
        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading accounts...</div>
        ) : (
          <>
            {/* Heading Row */}
            <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-lg shadow-md">
              <div className="flex-1 text-center font-bold">Account No</div>
              <div className="flex-1 text-center font-bold">Name</div>
              <div className="flex-1 text-center font-bold">Balance</div>
              <div className="flex-1 text-center font-bold">Account Type</div>
              <div className="flex-1 text-center font-bold">Actions</div>
            </div>

            {/* List of Accounts */}
            <div className="space-y-4 mt-4">
              {accounts && accounts.length > 0 ? (
                accounts.map((account, index) => (
                  <div
                    key={account._id}
                    className="flex justify-between items-center p-4 rounded-lg shadow-md shadow-richblack-100 transition-shadow duration-300 hover:shadow-lg bg-white"
                  >
                    <div className="flex-1 text-center text-gray-800">
                      <span>{account.accountNo}</span>
                    </div>
                    <div className="flex-1 text-center text-gray-800">
                      <span>{account.name}</span>
                    </div>
                    <div className="flex-1 text-center text-gray-800">
                      <span>${account.balance.toFixed(2)}</span>
                    </div>
                    <div className="flex-1 text-center text-gray-800">
                      <span>{account.accountType}</span>
                    </div>
                    <div className="flex-1 text-center space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg transition duration-200"
                        onClick={() => handleView(account)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-600">
                  No accounts available.
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {/* <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this account?"
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      /> */}
    </div>
  );
};
