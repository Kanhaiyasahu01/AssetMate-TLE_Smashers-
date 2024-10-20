import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsService, deleteClientService } from '../services/operations/client';
import { ConfirmationModal } from '../components/common/ConfirmationModel';

export const ManageClient = () => {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.client);
  const { token, loading: authLoading } = useSelector((state) => state.auth);
  const { loading: clientLoading } = useSelector((state) => state.client);
  
  // State for the confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientIdToDelete, setClientIdToDelete] = useState(null);

  // Fetch clients when the component is mounted
  useEffect(() => {
    if (clients.length === 0) {
      dispatch(fetchClientsService(token));
    }
  }, [clients, dispatch, token]);

  const handleDeleteClient = (clientId) => {
    setClientIdToDelete(clientId); // Set the client ID to delete
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmDelete = () => {
    if (clientIdToDelete) {
      dispatch(deleteClientService(token, clientIdToDelete)); // Pass the ID directly
      setClientIdToDelete(null); // Clear the client ID
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false); // Close the modal
    setClientIdToDelete(null); // Clear the client ID
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Clients List</h2>
      
      {/* Loading state */}
      {(authLoading || clientLoading) ? (
        <div className="text-center">Loading...</div>
      ) : (
        // Card container for the table
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          {clients && clients.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-inner">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-4 border-b">S. No</th>
                  <th className="py-3 px-4 border-b">Company</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{index + 1}</td>
                    <td className="py-3 px-4 border-b">{client.billingAddress.company}</td>
                    <td className="py-3 px-4 border-b">{client.billingAddress.email}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() => handleDeleteClient(client._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No clients found.</p>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this client?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};
