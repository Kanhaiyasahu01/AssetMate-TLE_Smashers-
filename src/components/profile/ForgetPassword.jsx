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
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-100">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="max-w-md p-6 lg:p-10 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800">
              {!emailSent ? "Reset Your Password" : "Check Your Email"}
            </h1>
            <p className="my-4 text-lg text-gray-600">
              {!emailSent
                ? "Enter your email to receive instructions for resetting your password. If you can’t access your email, try account recovery."
                : `We have sent reset instructions to ${email}.`}
            </p>
            <form onSubmit={handleOnSubmit}>
              {!emailSent && (
                <label className="block mb-4">
                  <span className="text-sm text-gray-700">
                    Email Address <sup className="text-red-500">*</sup>
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="mt-2 block w-full px-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </label>
              )}
              <button
                type="submit"
                className="w-full py-3 mt-4 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-400"
              >
                {!emailSent ? "Submit" : "Resend Email"}
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/login" className="text-gray-500 hover:text-gray-700">
                <div className="flex items-center gap-2">
                  <BiArrowBack /> Back to Login
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
}

