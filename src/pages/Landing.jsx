import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2'; // Import Pie chart from Chart.js
import 'chart.js/auto';

export const Landing = () => {
  // Sample bar chart data
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 20, 50, 70, 40, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Change color for Sales
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [20, 30, 40, 50, 70, 60],
        backgroundColor: 'rgba(255, 159, 64, 0.6)', // Change color for Expenses
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Sample pie chart data
  const pieData = {
    labels: ['Direct', 'Referral', 'Social Media'],
    datasets: [
      {
        label: 'Traffic Sources',
        data: [55, 30, 15],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-blue-300 p-6">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Application!</h1>
      <p className="text-lg text-white text-center mb-8">
        Our app helps you manage your accounts efficiently. Monitor your sales and expenses, gain insights, and make informed decisions.
      </p>
      
      <div className="flex space-x-4 mb-8">
        <Link to="/login">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Login</button>
        </Link>
        <Link to="/signup">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Sign Up</button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-center w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-white mb-4">Monthly Sales and Expenses</h2>
          <div style={{ height: '250px', width: '100%' }}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-white mb-4">Traffic Sources</h2>
          <div style={{ height: '250px', width: '100%' }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <p className="mt-6 text-white text-center">
        Explore our features and start managing your finances effectively!
      </p>
    </div>
  );
};
