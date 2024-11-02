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

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-blue-300">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
                <p className="text-sm text-gray-600 text-center">Login to continue</p>
                <form onSubmit={handleOnSubmit} className="space-y-4">
                    <label className="block">
                        <p className="mb-1 text-sm text-gray-700">
                            Email Address <sup className="text-red-500">*</sup>
                        </p>
                        <input
                            required
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder="Enter email address"
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="relative block">
                        <p className="mb-1 text-sm text-gray-700">
                            Password <sup className="text-red-500">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                        </span>
                        <Link to="/forgot-password" className="mt-1 text-xs text-right text-blue-600 block hover:underline">
                            Forgot Password?
                        </Link>
                    </label>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-gray-600">Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};