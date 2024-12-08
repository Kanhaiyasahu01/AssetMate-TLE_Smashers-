import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlantClientsService } from '../services/operations/client'; // Ensure this import is correct
import { toast } from 'react-hot-toast';

export const ManagePlantClient = () => {
  const { plantClients, loading } = useSelector(state => state.plantClient);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (plantClients.length === 0) {
      dispatch(getAllPlantClientsService(token));
    }
  }, [dispatch, plantClients.length, token]);

  // Handle Delete action
  const handleDelete = (id) => {
    // Implement delete functionality, call API to delete plant client
  };

  // Handle Modify action
  const handleModify = (id) => {
    // Implement modify functionality, navigate or show modify form
  };

  return (
    <div className=" space-y-4 w-full">
      {/* Heading Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold">Manage Plant Clients</h1>
      </div>

      {/* Table Card */}
      {loading ? (
        <p>Loading...</p>
      ) : plantClients.length === 0 ? (
        <p>No plant clients found</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">S.No</th>
                  <th className="p-3 text-left">Person Name</th>
                  <th className="p-3 text-left">Plant Name</th>
                  <th className="p-3 text-left">Mobile No</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {plantClients.map((client, index) => (
                  <tr key={client._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{client.personName}</td>
                    <td className="p-3">{client.plantName.billingAddress.name}</td>
                    <td className="p-3">{client.mobileNo}</td>
                    <td className="p-3">{client.email}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleModify(client._id)}
                        className="text-white bg-blue-500 p-2 rounded-sm"
                      >
                        Modify
                      </button>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="text-white bg-red-500 p-2 rounded-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
