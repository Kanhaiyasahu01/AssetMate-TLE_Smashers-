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
import { ManageNewProduct } from './pages/ManageNewProduct';
import { AddClient } from './pages/AddClient';
import { ManageClient } from './pages/ManageClient';
import { NewInvoice } from './pages/NewInvoice';
import { ManageInvoice } from './pages/ManageInvoice';
import { Quotation } from './pages/Quotation';
import { ManageQuotation } from './pages/ManageQuotation';
import PrintDownloadComponent from './pages/PrintDownloadComponent';
import { PrintOrder } from './pages/PrintOrder';
import TermsForm from './pages/TermsForm';
import { AddSupplier } from './pages/AddSupplier';
import { ManageSupplier } from './pages/ManageSupplier';
import { SupplierOrder } from './pages/SupplierOrder';
import { ManageAccounts } from './pages/ManageAccounts';
import { Transaction } from './pages/Transaction';
import { ManageTransaction } from './pages/ManageTransaction';
import { Accounts } from './pages/Accounts';
import { UpdateProduct } from './components/manage product/UpdateProduct';
import { ManageInvoice1 } from './pages/ManageInvoice1';
import { ManageSupplierOrder } from './pages/ManageSupplierOrder';
import { ViewSupplierOrder } from './pages/ViewSupplerOrder';
import { AccountDetail } from './components/accounts/AccountDetail';
import { Enquiry } from './pages/Enquiry';
import { ManageEnquiry } from './pages/ManageEnquiry';
import { Settings } from './pages/Settings';
import { EnquiryDetails } from './pages/EnquiryDetails';
import { UpdateEnquiry } from './pages/UpdateEnquiry';
import { Landing } from './pages/Landing';
import { ForgetPassword } from './components/profile/ForgetPassword';
import UpdatePassword from './components/profile/UpdatePassword';
function App() {

  const {user} = useSelector((state)=>state.profile);


  return (
    <div className='w-full h-screen min-h-screen flex flex-col font-roboto'>
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
              path="forgot-password"
              element={
                <OpenRoute>
                  <ForgetPassword />
                </OpenRoute>
              }
          />
          <Route
              path="/"
              element={
                <OpenRoute>
                  <Landing />
                </OpenRoute>
              }
          />
          <Route
              path="update-password/:id"
              element={
                <OpenRoute>
                  <UpdatePassword />
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
        <Route path="dashboard/my-profile" element={<DashboardView />} />
        <Route path="dashboard/view" element={<DashboardView />} />
        <Route path="stock/add-warehouse" element={<AddWarehouse />} />
        <Route path="stock/manage-warehouse" element={<ManageWarehouse />} />
        <Route path="stock/add-product" element={<AddNewProduct />} />
        <Route path="stock/manage-product" element={<ManageNewProduct />} />
        <Route path="crm/add-client" element={<AddClient />} />
        <Route path="crm/manage-client" element={<ManageClient />} />
        <Route path="sales/new-invoice" element={<NewInvoice />} />
        <Route path="sales/quotation" element={<Quotation />} />        
        <Route path="sales/manage-invoice" element={<ManageInvoice1 />} />        
        <Route path="sales/manage-quotation" element={<ManageQuotation />} />        
        <Route path="sales/view/:id" element={<PrintDownloadComponent />} />        
        <Route path="term/create" element={<TermsForm />} />        
        <Route path="/sales/viewOrder/:id" element={<PrintOrder />} />        
        <Route path="/supplier/new-supplier" element={<AddSupplier />} />        
        <Route path="/supplier/manage-supplier" element={<ManageSupplier />} />        
        <Route path="/supplier/new-order" element={<SupplierOrder />} />    
        {/* <Route path="/supplier/viewSupplierOrder/:id" element={<ViewSupplierOrder />} />     */}

        {/* Accounts */}
        <Route path="/accounts/accounts" element={<Accounts />} />    
        <Route path="/accounts/manage-accounts" element={<ManageAccounts />} />    
        <Route path="/accounts/transaction" element={<Transaction />} />    
        <Route path="/accounts/manage-transaction" element={<ManageTransaction />} />
        <Route path="/accounts/:id" element={<AccountDetail />} />



        {/* Products */}
        <Route path="/stock/update-product/:id" element={<UpdateProduct />} />  


        <Route path="/supplier/manage-order" element={<ManageSupplierOrder />} />    
        <Route path="/supplier/viewOrder/:orderId" element={<ViewSupplierOrder />} />  

        <Route path="/sales/new-enquiry" element={<Enquiry />} />    
        <Route path="/sales/manage-enquiry" element={<ManageEnquiry />} />    
        <Route path="/sales/enquiries/view/:id" element={<EnquiryDetails />} />    
        <Route path="/sales/enquiries/update/:id" element={<UpdateEnquiry />} />

        <Route path="/settings/setting" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
