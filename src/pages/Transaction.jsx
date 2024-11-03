import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliersService } from '../services/operations/supplier';
import { fetchClientsService } from '../services/operations/client';
import { fetchAccountsService } from '../services/operations/accounts'; 
import { createTransactionService } from '../services/operations/accounts';
import { updateSale, updateExpense } from '../slice/accountSlice';

export const Transaction = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { suppliers } = useSelector((state) => state.supplier);
  const { clients } = useSelector((state) => state.client);
  const { accounts, loading: accountsLoading } = useSelector((state) => state.account); 

  const [formData, setFormData] = useState({
    careOf: '',
    toAccount: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Set default date to today in YYYY-MM-DD format
    transactionType: '',
    method: '',
    note: '',
  });
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    if (suppliers.length === 0) {
      dispatch(fetchSuppliersService(token));
    }
    if (clients.length === 0) {
      dispatch(fetchClientsService(token));
    }
    if (accounts.length === 0) {
      dispatch(fetchAccountsService(token));
    }
  }, [dispatch, suppliers.length, clients.length, accounts.length, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(formData.amount) <= 0) {
      alert("Amount must be a positive number");
      return;
    }
  
    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date),
      isClient: isClient,
    };
  
    // Dispatch the createTransactionService and update the store directly
    dispatch(createTransactionService(token, transactionData));
  
    // Prepare the action payload for updating sales or expenses
    const actionPayload = {
      accountId: formData.toAccount,
      amount: transactionData.amount,
    };
    
    // Immediately update the Redux state based on transactionType
    if (transactionData.transactionType === "SALE") {
      dispatch(updateSale(actionPayload));
    } else if (transactionData.transactionType === "EXPENSE") {
      dispatch(updateExpense(actionPayload));
    }
  
    // Log transaction data
    console.log("Transaction created and store updated successfully:", transactionData);
  };

  return (
    <div className="bg-white shadow-lg shadow-richblack-100 rounded-lg p-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-700">
          {isClient ? 'Client' : 'Supplier'} Transaction
        </h3>
        <div className="flex items-center">
          <span className={`mr-3 text-gray-600 ${isClient ? 'font-semibold' : ''}`}>Client</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={!isClient} onChange={() => setIsClient(!isClient)} className="sr-only peer" />
            <div className="w-11 h-6 bg-richblack-300 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-500"></div>
          </label>
          <span className={`ml-3 text-gray-600 ${!isClient ? 'font-semibold' : ''}`}>Supplier</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">{isClient ? 'Client' : 'Supplier'}</label>
            <select
              name="careOf"
              value={formData.careOf}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select {isClient ? 'Client' : 'Supplier'}</option>
              {(isClient ? clients : suppliers).map((item) => (
                <option key={item._id} value={item._id}>
                  {item?.billingAddress?.company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">To Account</label>
            <select
              name="toAccount"
              value={formData.toAccount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Account</option>
              {accountsLoading ? (
                <option>Loading accounts...</option>
              ) : (
                accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Transaction Type</label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Type</option>
              <option value="SALE">Sale</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Method</option>
              <option value="CASH">Cash</option>
              <option value="CREDIT">Credit</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Enter any notes"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-600 transition duration-200">
          Submit Transaction
        </button>
      </form>
    </div>
  );
};
