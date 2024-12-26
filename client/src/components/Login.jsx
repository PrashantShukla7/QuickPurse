import axios from "../utils/axios.js";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
    const [credential, setCredential] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {checkAuth} = useContext(AuthContext)

    const handleInputChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/login", credential, {
                withCredentials: true,
            });
            await checkAuth();
            navigate("/");
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen pt-10">
            <h1 className="text-4xl text-center font-bold mb-10">Login</h1>
            <form
                className="flex flex-col max-w-[40vw] mx-auto bg-stone-200 p-7 rounded-md gap-y-3"
                onSubmit={handleLogin}
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
                <label htmlFor="phone" className="text-slate-700 font-semibold">
                    Mobile number
                </label>
                <input
                    type="number"
                    name="phone"
                    placeholder="Enter your mobile number"
                    id="phone"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 rounded-md border-b-2 border-teal-600 outline-none"
                    onChange={handleInputChange}
                />
                <label
                    htmlFor="password"
                    className="text-slate-700 font-semibold"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    id="password"
                    className="p-2 rounded-md border-b-2 border-teal-600 outline-none"
                    onChange={handleInputChange}
                />

                <small className="text-sm">
                    Already have an account?{" "}
                    <Link to="/signup" className="text-teal-600">
                        Sign Up
                    </Link>
                </small>

                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-teal-500 font-semibold w-32 px-4 py-2 rounded-md"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
