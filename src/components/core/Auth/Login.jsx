import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../../services/operations/authAPI';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    
    const { email, password } = formData;

    // Handle input changes
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    // Handle form submission
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-2xl font-semibold mb-4">Login</div>
            <form onSubmit={handleOnSubmit} className="mt-6 w-full max-w-sm flex flex-col gap-y-4">
                <label className="w-full">
                    <p className="mb-1 text-sm leading-tight">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter email address"
                        className="w-full rounded-lg p-2 shadow-inner border border-gray-300 focus:outline-none focus:ring focus:ring-yellow-300"
                    />
                </label>
                <label className="relative">
                    <p className="mb-1 text-sm leading-tight">
                        Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter Password"
                        className="w-full rounded-lg p-2 shadow-inner border border-gray-300 focus:outline-none focus:ring focus:ring-yellow-300"
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-10 cursor-pointer"
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                    <Link to="/forgot-password">
                        <p className="mt-1 ml-auto text-xs text-blue-600 hover:underline">Forgot Password?</p>
                    </Link>
                </label>
                <button
                    type="submit"
                    className="mt-6 rounded-lg bg-yellow-50 py-2 px-4 font-medium text-richblack-900 transition duration-200 hover:bg-yellow-100"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};
