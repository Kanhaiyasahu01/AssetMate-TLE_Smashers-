import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsService } from '../services/operations/client';
import { fetchSuppliersService } from '../services/operations/supplier';
import { getClientTransactions, getSupplierTransactions } from '../services/operations/accounts';
import { ManageTransactions } from '../components/transactions/ManageTransactions';

export const ManageTransaction = () => {
  const { token } = useSelector((state) => state.auth);
  const { clients } = useSelector((state) => state.client);
  const { suppliers } = useSelector((state) => state.supplier);

  // Corrected selector for client and supplier transactions
  const { clientTransactions } = useSelector((state) => state.transaction);
  const { supplierTransactions } = useSelector((state) => state.transaction);

  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(true); // Toggle between clients and suppliers

  useEffect(() => {
    // Fetch clients and suppliers if not already available
    if (clients.length === 0) {
      dispatch(fetchClientsService(token));
    }
    if (suppliers.length === 0) {
      dispatch(fetchSuppliersService(token));
    }
  
    // Fetch client and supplier transactions if not already available
    if (clientTransactions.length === 0) {
      dispatch(getClientTransactions(token));
    }
    if (supplierTransactions.length === 0) {
      dispatch(getSupplierTransactions(token));
    }
  }, [clients.length, suppliers.length, clientTransactions.length, supplierTransactions.length, dispatch, token]);
  

  return (
    <div className="container mx-auto p-4">

      {/* Header Card */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex justify-between item-center">
        <h1 className="text-3xl font-bold text-center text-blue-600">Manage Transactions</h1>


      {/* Toggle Card */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-center">
        <button
          className={`mr-2 px-6 py-2 rounded ${isClient ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setIsClient(true)}
        >
          Client Transactions
        </button>
        <button
          className={`px-6 py-2 rounded ${!isClient ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setIsClient(false)}
        >
          Supplier Transactions
        </button>
      </div>
      </div>
      {/* Render the appropriate transactions based on toggle */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {isClient ? (
          <ManageTransactions transactions={clientTransactions} isSupplier={false} />
        ) : (
          <ManageTransactions transactions={supplierTransactions} isSupplier={true} />
        )}
      </div>
    </div>
  );
};
