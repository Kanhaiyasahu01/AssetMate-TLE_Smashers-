import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components from chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const DashboardView = () => {
  const todayInvoiceCount = 10; // Replace with dynamic data
  const monthInvoiceCount = 200; // Replace with dynamic data
  const todaySalesAmount = 1500; // Replace with dynamic data
  const monthSalesAmount = 45000; // Replace with dynamic data

  // Sample data for sales and invoices
  const salesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sales (₹)',
        data: [12000, 15000, 13000, 16000], // Replace with dynamic data
        borderColor: '#06D6A0',
        backgroundColor: 'rgba(6, 214, 160, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const invoiceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Invoices',
        data: [30, 45, 35, 50], // Replace with dynamic data
        borderColor: '#FF1010',
        backgroundColor: 'rgba(255, 16, 16, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales and Invoices Data',
      },
    },
  };

  return (
    <div className="flex flex-wrap justify-around items-center p-5">
      {/* Today's Invoice Count */}
      <div
        className="bg-gradient-to-br from-caribbeangreen-400 to-caribbeangreen-600 text-white text-center font-bold p-5 m-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-60"
      >
        <h3 className="text-lg">Today's Invoices</h3>
        <p className="text-2xl">{todayInvoiceCount}</p>
      </div>

      {/* This Month's Invoice Count */}
      <div
        className="bg-gradient-to-br from-red-400 to-red-600 text-white text-center font-bold p-5 m-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-60"
      >
        <h3 className="text-lg">This Month's Invoices</h3>
        <p className="text-2xl">{monthInvoiceCount}</p>
      </div>

      {/* Today's Sales Amount */}
      <div
        className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-center font-bold p-5 m-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-60"
      >
        <h3 className="text-lg">Today's Sales</h3>
        <p className="text-2xl">₹ {todaySalesAmount}</p>
      </div>

      {/* This Month's Sales Amount */}
      <div
        className="bg-gradient-to-br from-green-400 to-green-600 text-white text-center font-bold p-5 m-2 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-60"
      >
        <h3 className="text-lg">This Month's Sales</h3>
        <p className="text-2xl">₹ {monthSalesAmount}</p>
      </div>

      {/* Sales Chart */}
      <div className="w-full max-w-4xl mt-5">
        <h3 className="text-xl font-bold mb-2 text-center">Sales Trend</h3>
        <Line data={salesData} options={chartOptions} />
      </div>

      {/* Invoices Chart */}
      <div className="w-full max-w-4xl mt-5">
        <h3 className="text-xl font-bold mb-2 text-center">Invoices Trend</h3>
        <Line data={invoiceData} options={chartOptions} />
      </div>
    </div>
  );
};
