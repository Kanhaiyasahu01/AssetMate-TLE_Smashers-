import React from 'react'
import { ManageDocument } from '../components/sales/ManageDocument'
export const ManageQuotation = () => {
  const type = "quotation"
  return (
    <div>
    <ManageDocument type={type}/>
    </div>
  )
}
