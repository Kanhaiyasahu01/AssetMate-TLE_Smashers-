import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { logout, updateProfile } from '../actions/userActions';
import { updateProfile } from '../services/operations/authAPI';

export const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector(state => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    phoneNumber: user?.phoneNumber || '',
    gstIn: user?.gstIn || '',
  });
  console.log(user);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = () => {
    dispatch(updateProfile(formData,token));
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCancelEdit = () => {
    // Reset form data to initial user data if user cancels editing
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      address: user?.address || '',
      phoneNumber: user?.phoneNumber || '',
      gstIn: user?.gstIn || '',
    });
    setEditMode(false);
  };

  return (
    <div className="max-w-3xl bg-white mx-auto p-6 bg-gray-100 rounded-lg shadow-lg shadow-richblack-100 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Settings</h2>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md shadow-richblack-100">
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                disabled
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="gstIn"
                value={formData.gstIn}
                onChange={handleInputChange}
                placeholder="GSTIN (optional)"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
              <p><strong>GSTIN:</strong> {user.gstIn || 'N/A'}</p>
            </>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md shadow-richblack-100 mt-4 flex justify-between">
          {editMode ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="w-full md:w-auto px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancelEdit}
                className="w-full md:w-auto px-6 py-2 bg-pure-greys-200 text-white font-semibold rounded-md hover:bg-pure-greys-500 transition duration-200 ml-4"
              >
                Back
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full md:w-auto px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200 ml-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
