import React from 'react'
import { useSelector } from 'react-redux'
import { ProfileDropdown } from './ProfileDropdown';
import { Link } from 'react-router-dom';
export default function Navbar() {

    const {token} = useSelector((state) => state.auth);

  return (
    <div className='w-full flex flex-row justify-between bg-gray-800 text-white py-4 px-4 border-b-2 border-black' >

        {/* LOGO */}
        <div>
            <div>LOGO</div>
        </div>

        {/* Login / signup / profile */}
        <div className='flex flex-row gap-2'>
        {token === null && (
            <Link to="/login">
              <button>
                Log in
              </button>
            </Link>
        )}

        {token === null && (
            <Link to="/signup">
              <button>
                Sign up
              </button>
            </Link>
        )}
        
          
        {token !== null && <ProfileDropdown />}

        </div>
    </div>
  )
}
