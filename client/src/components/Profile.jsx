import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

const Profile = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <Navbar />
            <div className="p-4">
                <div className="bg-white p-4 rounded-md mt-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full mb-4"></div>
                    <div className="flex gap-x-2">
                        <h2 className="font-semibold">Name: </h2>
                        <p className="text-gray-800">{user.name}</p>
                    </div>
                    <div className="flex gap-x-2">
                        <h2 className="font-semibold">UPI ID: </h2>
                        <p className="text-gray-800">{user.upiId}</p>
                    </div>
                    <div className="flex gap-x-2">
                        <h2 className="font-semibold">Email: </h2>
                        <p className="text-gray-800">{user.email}</p>
                    </div>
                    <div className="flex gap-x-2">
                        <h2 className="font-semibold">Balance: </h2>
                        <p className="text-gray-800">₹{user.balance}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
