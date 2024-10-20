import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ClientTransactions } from './ClientTransactions';
import { SupplierTransactions } from './SupplierTransactions';
import { AllTransactions } from './AllTransactions';

export const AccountDetail = () => {
  const location = useLocation();
  const { account } = location.state;

  console.log("accounts", account);
  const [selectedTab, setSelectedTab] = useState('all');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>

      {/* Account No in one row with bold text */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Account No: {account.accountNo}</h2>
        </div>

        {/* Styled account details with two items per row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Name:</h2>
            <p className="text-gray-600">{account.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Balance:</h2>
            <p className="text-gray-700">₹{account.balance.toFixed(2)}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Account Type:</h2>
            <p className="text-gray-700">{account.accountType}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Opening Date:</h2>
            <p className="text-gray-700">{new Date(account.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs for Transactions */}
      <div className="mt-4">
        <button
          className={`mr-2 p-2 ${selectedTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('all')}
        >
          All Transactions
        </button>
        <button
          className={`mr-2 p-2 ${selectedTab === 'client' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('client')}
        >
          Client Transactions
        </button>
        <button
          className={`p-2 ${selectedTab === 'supplier' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('supplier')}
        >
          Supplier Transactions
        </button>
      </div>

      {/* Conditionally Render Transactions Based on Selected Tab */}
      <div className="mt-6">
        {selectedTab === 'all' && (
          <AllTransactions
            clientTransactions={account.clientTransactions}
            supplierTransactions={account.supplierTransactions}
          />
        )}
        {selectedTab === 'client' && (
          <ClientTransactions transactions={account.clientTransactions} />
        )}
        {selectedTab === 'supplier' && (
          <SupplierTransactions transactions={account.supplierTransactions} />
        )}
      </div>
    </div>
  );
};
