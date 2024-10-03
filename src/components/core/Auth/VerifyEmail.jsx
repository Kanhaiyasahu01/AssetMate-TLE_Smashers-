import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { RxCountdownTimer } from 'react-icons/rx';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../../../services/operations/authAPI';

export const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access to this route when the user has filled the signup form
    if (!signupData) {
      navigate('/signup');
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
        name,
        email,
        password,
        role,
        address,
        phoneNumber,
        gstIn,
    } = signupData;

    dispatch(
      signUp(
        name,
        email,
        password,
        otp,
        role,
        address,
        phoneNumber,
        gstIn,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner">Loading..</div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1>Verify Email</h1>
          <p>
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
                  }}
                  className="w-[48px] lg:w-[60px] border rounded-[0.5rem] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: 'space-between',
                gap: '0 6px',
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
