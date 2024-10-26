import React from 'react'
import { useSelector } from 'react-redux'
import { ProfileDropdown } from './ProfileDropdown';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo.png"

export default function Navbar() {

  const { token } = useSelector((state) => state.auth);

  return (
    <div className="w-full flex flex-row justify-between items-center bg-gray-800 text-white py-2 px-6 border-b-2 border-black">

      {/* LOGO Section */}
      <div className="flex items-center gap-1">
        <img src={logo} alt="LOGO" className="w-12 h-12" />
        <p className="text-red-500 text-4xl">
          Vinayak Sales
        </p>
      </div>

      {/* Login / Signup / Profile */}
      <div className="flex flex-row gap-4">
        {token === null ? (
          <>
            <Link to="/login">
              <button className="hover:underline">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="hover:underline">
                Sign up
              </button>
            </Link>
          </>
        ) : (
          <ProfileDropdown />
        )}
      </div>
    </div>
  );
}
