import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../../services/operations/authAPI";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gradient-to-r from-blue-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>
          <p className="mb-6 text-base text-gray-600 text-center">
            {!emailSent
              ? "Enter your email to receive instructions for resetting your password."
              : `We have sent reset instructions to ${email}.`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="block mb-6">
                <span className="text-sm font-medium text-gray-700">
                  Email Address <sup className="text-red-500">*</sup>
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-2 w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm"
                />
              </label>
            )}
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex justify-center">
            <Link to="/login" className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2">
              <BiArrowBack size={20} /> Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
