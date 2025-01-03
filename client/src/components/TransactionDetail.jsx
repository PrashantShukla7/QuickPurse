import axios from "../utils/axios.js";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const TransactionDetail = () => {
    const { pathname } = useLocation();
    const id = pathname.split("/")[2];
    const [transaction, setTransaction] = useState({});
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) {
            return "N/A"; // Early return for null or undefined
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "N/A"; // Return N/A for invalid date strings
        }

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    useEffect(() => {
        const getTransaction = async () => {
            try {
                const res = await axios.get(`/transaction/${id}`);
                setTransaction(res.data);
                console.log(transaction.date);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Something went wrong!"
                );
            }
        };
        getTransaction();
    }, []);

    const {user} = useContext(AuthContext);

    return (
        <>
            <Navbar />
            <div className="p-8 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                        Transaction Details
                    </h2>
                    {error ? (
                        <p className="text-red-600 text-center">{error}</p>
                    ) : (
                        <div>
                            <h3
                                className={`text-center text-3xl font-semibold mb-6 ${
                                    transaction.sender_upi_id === user.upiId
                                        ? "text-[#EF4444]"
                                        : "text-[#10B981]"
                                }`}
                            >
                                ₹ {transaction.amount}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-2">
                                    <h3 className="text-sm font-bold text-gray-600">
                                        Sender
                                    </h3>
                                    <p className="text-sm text-gray-800">
                                        {transaction.sender_upi_id}
                                    </p>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <h3 className="text-sm font-bold text-gray-600">
                                        Receiver
                                    </h3>
                                    <p className="text-sm text-gray-800">
                                        {transaction.receiver_upi_id}
                                    </p>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <h3 className="text-sm font-bold text-gray-600">
                                        Date
                                    </h3>
                                    <p className="text-sm text-gray-800">
                                        {formatDate(transaction.date)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TransactionDetail;
