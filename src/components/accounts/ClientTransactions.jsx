import React, { useState } from 'react';

export const ClientTransactions = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter transactions based on search term and date range
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.createdAt).getTime();

    // Check if search term matches company name
    const matchesSearchTerm = searchTerm
      ? transaction?.careOf?.billingAddress?.company
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    // Check if transaction date is within the selected date range
    const matchesDateRange = (!startDate || transactionDate >= new Date(startDate).getTime()) &&
                             (!endDate || transactionDate <= new Date(endDate).getTime());

    return matchesSearchTerm && matchesDateRange;
  });

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Client Transactions</h2>

      {/* Search by Company Name */}
      <input
        type="text"
        placeholder="Search Client Transactions"
        className="border p-2 mt-2 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter by Date Range */}
      <div className="flex space-x-4 mt-4">
        <input
          type="date"
          className="border p-2 w-full"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Display Filtered Transactions in a Table */}
      <div className="mt-6">
        {filteredTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border border-gray-300">Company Name</th>
                <th className="p-2 border border-gray-300">Amount</th>
                <th className="p-2 border border-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr key={transaction._id} className="bg-white">
                  <td className="p-2 border border-gray-300">
                    {transaction?.careOf?.billingAddress?.company}
                  </td>
                  <td className="p-2 border border-gray-300">
                    ₹{transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
