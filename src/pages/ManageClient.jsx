import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClientsService,
  deleteClientService,
} from "../services/operations/client";
import { ConfirmationModal } from "../components/common/ConfirmationModel";
import { Link } from "react-router-dom";

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
      <div className="w-full bg-white shadow-xl p-6 mb-6 rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Manage Client
        </h1>
      </div>

      {/* Loading state */}
      {authLoading || clientLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        // Card container for the table
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          {clients && clients.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-inner">
              <thead className="bg-blue-600 text-white">
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-4 border-b">S. No</th>
                  <th className="py-3 px-4 border-b">Plant Name</th>
                  <th className="py-3 px-4 border-b">City</th>

                  {/* <th className="py-3 px-4 border-b">Email</th> */}

                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{index + 1}</td>
                    {/* <td className="py-3 px-4 border-b">{client.billingAddress.company}</td> */}
                    <td className="py-3 px-4 border-b">
                      {client.billingAddress.name}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {client.billingAddress.city}
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                    <Link
                        to={`/crm/update-client/${client._id}`}
                        className="bg-blue-500 text-white p-2 rounded-sm mx-1 font-semibold transition-colors duration-200"
                      >
                        Modify
                      </Link>
                      <button
                        onClick={() => handleDeleteClient(client._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-sm"
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
