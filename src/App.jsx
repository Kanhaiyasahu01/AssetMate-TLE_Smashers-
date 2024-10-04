import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Navbar from './components/common/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Route,Routes } from 'react-router-dom';
import OpenRoute from './components/core/Auth/OpenRoute';
import { Login } from './components/core/Auth/Login';
import { Signup } from './components/core/Auth/Signup';
import { VerifyEmail } from './components/core/Auth/VerifyEmail';
import { MyProfile } from './pages/MyProfile';
import { DashboardView } from './pages/DashboardView';
import { AddWarehouse } from './pages/AddWarehouse';
import { ManageWarehouse } from './pages/ManageWarehouse';
import { AddNewProduct } from './pages/AddNewProduct';
function App() {

  const {user} = useSelector((state)=>state.profile);


  return (
    <div className='w-full h-screen min-h-screen flex flex-col'>
      <Navbar/>

      <Routes>
          <Route
              path="signup"
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              }
            />
          <Route
              path="login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
          />
           <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

        <Route 
            element={
              <Dashboard/>
            }
          >
        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/view" element={<DashboardView />} />
        <Route path="stock/add-warehouse" element={<AddWarehouse />} />
        <Route path="stock/manage-warehouse" element={<ManageWarehouse />} />
        <Route path="stock/add-product" element={<AddNewProduct />} />

      
        {/* <Route path="dashboard/Settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App
