import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { fetchAccountsService } from '../services/operations/accounts';
export const DashboardView = () => {
  const dispatch = useDispatch();
  const {token} = useSelector(state=>state.auth);
  const { accounts, loading } = useSelector((state) => state.account); // Default to empty array if accounts is undefined

  useEffect(() => {
      dispatch(fetchAccountsService(token)); 
      console.log("i am calling ")
  }, []);

  console.log("accounts", accounts);

  const totalAccounts = accounts.length;
  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0).toFixed(2);
  const totalSales = accounts.reduce((sum, account) => sum + Number(account.sale), 0).toFixed(2);
  const totalExpenses = accounts.reduce((sum, account) => sum + Number(account.expense), 0).toFixed(2);
  const netProfit = (totalSales - totalExpenses).toFixed(2);

  const accountTypes = accounts.reduce((acc, account) => {
    acc[account.accountType] = (acc[account.accountType] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  const pieChartData = {
    labels: Object.keys(accountTypes),
    datasets: [
      {
        label: 'Account Types',
        data: Object.values(accountTypes),
        backgroundColor: ['#FF9800', '#2196F3', '#4CAF50', '#9C27B0'],
      },
    ],
  };

  const barChartData = {
    labels: ['Sales', 'Expenses'],
    datasets: [
      {
        label: 'Amount in ₹',
        data: [totalSales, totalExpenses],
        backgroundColor: ['#FF5722', '#8BC34A'],
      },
    ],
  };

  const accountTypeColors = {
    Savings: 'bg-richblue-200',
    Checking: 'bg-caribbeangreen-100',
    Current: 'bg-pink-100',
    Other: 'bg-richblack-200',
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold">Total Accounts</h3>
          <p className="text-2xl font-bold text-richblue-500">{totalAccounts || 0}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold">Total Balance</h3>
          <p className="text-2xl font-bold text-caribbeangreen-500">₹{totalBalance || '0.00'}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold">Net Profit</h3>
          <p className="text-2xl font-bold text-yellow-500">₹{netProfit || '0.00'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Account Types Breakdown</h3>
          <div className="h-64 w-full">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Sales vs Expenses</h3>
          <div className="h-64 w-full">
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {Object.keys(accountTypeColors).map((accountType) => (
        <div key={accountType} className="mb-8">
          <div className={`${accountTypeColors[accountType]} text-richblack-900 p-3 rounded-t-lg font-bold text-lg`}>
            {accountType}
          </div>
          <div className="bg-white shadow-md rounded-b-lg p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Account</th>
                  <th className="p-2">Balance</th>
                  <th className="p-2">Sales</th>
                  <th className="p-2">Expenses</th>
                </tr>
              </thead>
              <tbody>
                {accounts
                  .filter((account) => account.accountType === accountType)
                  .map((account, index) => (
                    <tr key={account.accountNo} className="border-t">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{account.name}</td>
                      <td className="p-2">{account.accountNo}</td>
                      <td className="p-2">₹{Number(account.balance).toFixed(2)}</td>
                      <td className="p-2">₹{Number(account.sale).toFixed(2)}</td>
                      <td className="p-2">₹{Number(account.expense).toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
