import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { updateProducts } from '../../services/operations/warehouse';
export const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { product, warehouseId } = location.state;
  console.log("warehouse id",warehouseId);
  console.log("Product",product);
    const {token} = useSelector(state =>state.auth);
 const {id} = useParams();

  const [productDetails, setProductDetails] = useState({
    retailPrice: product?.retailPrice || '',
    purchaseOrderPrice: product?.purchaseOrderPrice || '',
    stockUnit: product?.stockUnit || '',
    alertQuantity: product?.alertQuantity || '',
    tax: product?.tax || '',
    discount: product?.discount || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Products",{...productDetails,id});
    dispatch(updateProducts(token,{...productDetails,id},warehouseId,navigate));
  };

  return (
    <div className="container mx-auto p-6 w-full max-w-2xl border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Update product <span className='text-richblue-200'>{product?.name}</span></h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {Object.entries(productDetails).map(([key, value]) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 mb-1 capitalize">{key}</label>
              <input
                type="number"
                name={key}
                value={value}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};
