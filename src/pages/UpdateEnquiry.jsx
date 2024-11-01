import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiryService,updateEnquiryService } from '../services/operations/enquiry';

export const UpdateEnquiry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [enquiry, setEnquiry] = useState({
    plantName: '',
    contactPerson: '',
    materialRequired: [{ name: '', quantity: '' }],
    termsAndConditions: [''],
    note: '',
  });

  useEffect(() => {
    // Fetch the enquiry details by ID and prefill the state
    dispatch(getEnquiryService(token,id,setEnquiry));
    console.log(enquiry);
  }, [dispatch, token, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEnquiry((prevEnquiry) => ({ ...prevEnquiry, [name]: value }));
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = enquiry.materialRequired.map((material, i) =>
      i === index ? { ...material, [field]: value } : material
    );
    setEnquiry({ ...enquiry, materialRequired: updatedMaterials });
  };

  const handleTermChange = (index, value) => {
    const updatedTerms = enquiry.termsAndConditions.map((term, i) =>
      i === index ? value : term
    );
    setEnquiry({ ...enquiry, termsAndConditions: updatedTerms });
  };

  const addMaterial = () => {
    setEnquiry({
      ...enquiry,
      materialRequired: [...enquiry.materialRequired, { name: '', quantity: '' }],
    });
  };

  const removeMaterial = (index) => {
    const updatedMaterials = enquiry.materialRequired.filter((_, i) => i !== index);
    setEnquiry({ ...enquiry, materialRequired: updatedMaterials });
  };

  const addTerm = () => {
    setEnquiry({
      ...enquiry,
      termsAndConditions: [...enquiry.termsAndConditions, ''],
    });
  };

  const removeTerm = (index) => {
    const updatedTerms = enquiry.termsAndConditions.filter((_, i) => i !== index);
    setEnquiry({ ...enquiry, termsAndConditions: updatedTerms });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateEnquiryService(token, id, enquiry,navigate));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Update Enquiry</h2>
      <form onSubmit={handleUpdate} className="bg-white shadow-md rounded p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Plant Name</label>
          <input
            type="text"
            name="plantName"
            value={enquiry.plantName}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={enquiry.contactPerson}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Materials Required</label>
          {enquiry.materialRequired.map((material, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Material Name"
                value={material.name}
                onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                className="w-1/2 p-2 border rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={material.quantity}
                onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                className="w-1/2 p-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => removeMaterial(index)}
                className="text-red-600 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addMaterial} className="text-blue-600 text-sm mt-1">
            + Add Material
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Terms and Conditions</label>
          {enquiry.termsAndConditions.map((term, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                placeholder="Enter term"
                value={term}
                onChange={(e) => handleTermChange(index, e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => removeTerm(index)}
                className="text-red-600 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addTerm} className="text-blue-600 text-sm mt-1">
            + Add Term
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <textarea
            name="note"
            value={enquiry.note}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Update Enquiry
        </button>
      </form>
    </div>
  );
};
