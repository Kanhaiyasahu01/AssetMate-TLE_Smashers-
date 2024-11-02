import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutService } from '../../services/operations/authAPI';

export const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutService(navigate)); // Dispatch the logout service directly
  };

  return (
    <div className="relative">
      {/* Profile Image */}
      <img
        src={user.image}
        alt="User Profile"
        className="w-10 h-10 rounded-full cursor-pointer bg-white font-inter"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      />

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-blue-500 rounded-md shadow-lg border z-10">
          <ul className="py-1">
            <li className="border-b-2 border-richblack-500">
              <Link
                to="/settings/setting"
                className="block px-4 py-2 text-white hover:bg-richblack-500 transition-colors duration-150"
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout} // Directly call logout on button click
                className="w-full text-left px-4 py-2 text-white hover:bg-richblack-500 transition-colors duration-150"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
