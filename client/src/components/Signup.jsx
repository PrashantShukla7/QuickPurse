import axios from "../utils/axios.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [credential, setCredential] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //validating the phone number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(credential.phone)) {
            setError("Invalid phone number");
            return;
        }
        try {
            const res = await axios.post("/signup", credential, {
                withCredentials: true,
            });
            navigate("/login");
        } catch (e) {
            console.log(e);
            setError("Oops! Something went wrong.");
            return;
        }
    };

    return (
        <div className="min-h-screen pt-10">
            <h1 className="text-4xl text-center font-bold mb-10">Sign Up</h1>
            <form
                className="flex flex-col w-[80vw] sm:max-w-[50vw] md:max-w-[40vw] mx-auto bg-white p-7 rounded-md gap-y-3"
                onSubmit={handleSubmit}
            >
                {error && (
                    <div className="bg-[#f871716e] px-4 py-2 rounded-md border-2 border-red-600 flex justify-between">
                        <p className="text-red-700">{error}</p>
                        <i
                            className="ri-close-large-fill text-red-700 cursor-pointer"
                            title="close"
                            onClick={() => setError(null)}
                        ></i>
                    </div>
                )}
                <label htmlFor="name" className="text-slate-700 font-semibold">
                    Name
                </label>
                <input
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    id="name"
                    className="p-2 rounded-md border-b-2 border-teal-600 outline-none bg-zinc-100"
                    required
                />
                <label
                    htmlFor="email"
                    className="text-slate-700 font-semibold"
                    id="email"
                >
                    E-mail
                </label>
                <input
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    id="email"
                    className="p-2 rounded-md border-b-2 border-teal-600 outline-none bg-zinc-100"
                    required
                />
                <label htmlFor="phone" className="text-slate-700 font-semibold">
                    Mobile number
                </label>
                <input
                    onChange={handleInputChange}
                    type="number"
                    name="phone"
                    placeholder="Enter your mobile number"
                    id="phone"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 rounded-md border-b-2 border-teal-600 outline-none bg-zinc-100"
                    required
                />
                <label
                    htmlFor="password"
                    className="text-slate-700 font-semibold"
                >
                    Password
                </label>
                <input
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    id="password"
                    className="p-2 rounded-md border-b-2 border-teal-600 outline-none bg-zinc-100"
                    required
                />

                <small className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-teal-600">
                        Login
                    </Link>
                </small>

                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-teal-500 font-semibold w-32 px-4 py-2 rounded-md"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
