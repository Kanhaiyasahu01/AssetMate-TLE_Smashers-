import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliersService } from '../services/operations/supplier';
import { fetchClientsService } from '../services/operations/client';
import { fetchAccountsService } from '../services/operations/accounts'; 
import { createTransactionService } from '../services/operations/accounts';

export const Transaction = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { suppliers } = useSelector((state) => state.supplier);
  const { clients } = useSelector((state) => state.client);
  const { accounts, loading: accountsLoading } = useSelector((state) => state.account); 

  // Unified form state to manage all input fields
  const [formData, setFormData] = useState({
    careOf: '',
    toAccount: '',
    amount: '',
    date: '',
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

    // Ensure amount is a positive number
    if (parseFloat(formData.amount) <= 0) {
      alert('Amount must be a positive number');
      return;
    }

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount), // Ensuring the amount is a number
      date: new Date(formData.date),
      isClient: isClient,
    };

    dispatch(createTransactionService(token, transactionData));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{isClient ? 'Client' : 'Supplier'} Transaction</h3>
        <div className="flex items-center">
          <span className={`mr-2 ${isClient ? 'font-bold' : ''}`}>Client</span>
          <label className="switch">
            <input type="checkbox" checked={!isClient} onChange={() => setIsClient(!isClient)} />
            <span className="slider round"></span>
          </label>
          <span className={`ml-2 ${!isClient ? 'font-bold' : ''}`}>Supplier</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">{isClient ? 'Client' : 'Supplier'}</label>
            <select
              name="careOf"
              value={formData.careOf}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
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
            <label className="block font-semibold mb-2">To Account</label>
            <select
              name="toAccount"
              value={formData.toAccount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
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

          <div>
            <label className="block font-semibold mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Transaction Type</label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="SALE">Sale</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Payment Method</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Method</option>
              <option value="CASH">Cash</option>
              <option value="CREDIT">Credit</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Enter any notes"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="bg-caribbeangreen-400 text-white px-4 py-2 rounded">
          Submit Transaction
        </button>
      </form>
    </div>
  );
};
