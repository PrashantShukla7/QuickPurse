import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 ">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-28"></div>
                    <div className="relative -mt-14 flex justify-center">
                        <div className="w-28 h-28 bg-green-500 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white text-3xl font-bold">
                            {user.name[0]?.toUpperCase()}
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    {/* Details Section */}
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <i className="fas fa-money-check-alt"></i>
                            </span>
                            <div>
                                <h3 className="text-sm font-medium text-gray-600">Balance</h3>
                                <p className="text-lg font-semibold text-gray-800">₹{user.balance}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <i className="fas fa-wallet"></i>
                            </span>
                            <div>
                                <h3 className="text-sm font-medium text-gray-600">UPI ID</h3>
                                <p className="text-lg font-semibold text-gray-800">{user.upiId}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <div>
                                <h3 className="text-sm font-medium text-gray-600">Email</h3>
                                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-500 text-white translate-x-[-50%] ml-[50%] mt-6">Logout</button>
            </div>
        </>
    );
};

export default Profile;
