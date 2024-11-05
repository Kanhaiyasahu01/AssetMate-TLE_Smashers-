import React from 'react'
import { ManageDocument } from '../components/sales/ManageDocument'
export const ViewMarketingQuotations = () => {
    const type = "marketing"
    return (
      <div>
      <ManageDocument type={type}/>
      </div>
    )
}
