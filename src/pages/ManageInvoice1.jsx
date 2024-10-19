import React from 'react'
import { ManageDocument } from '../components/sales/ManageDocument'
export const ManageInvoice1 = () => {
    const type = "invoice"
  return (
    <div>
        <ManageDocument type={type}/>
    </div>
  )
}
