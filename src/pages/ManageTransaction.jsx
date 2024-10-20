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
  console.log("client",clientTransactions)
  console.log("supplier",supplierTransactions)
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
    
    // Add dependencies to prevent infinite re-renders
  }, []);
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>

      {/* Toggle between Client and Supplier Transactions */}
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${isClient ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setIsClient(true)}
        >
          Client Transactions
        </button>
        <button
          className={`px-4 py-2 rounded ${!isClient ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setIsClient(false)}
        >
          Supplier Transactions
        </button>
      </div>

      {/* Render the appropriate transactions based on toggle */}
      {isClient ? (
          <ManageTransactions  transactions = {clientTransactions} isSupplier={false}/>
      ) : (
        <ManageTransactions  transactions = {supplierTransactions} isSupplier={true}/>

      )}
    </div>
  );
};
