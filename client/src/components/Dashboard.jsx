import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axios.js";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(AuthContext);
    const [transactionInput, setTransactionInput] = useState({});
    const [error, setError] = useState(null);
    const [transactionSuccess, setTransactionSuccess] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        const getTransactions = async () => {
            const res = await axios.get(`/transactions/${user._id}`);
            setTransactions(res.data.transactions.reverse());
        };
        getTransactions();
    }, []);

    const handleTransactionInputChange = (e) => {
        setTransactionInput({
            ...transactionInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleSendMoney = async (e) => {
        e.preventDefault();
        try {
            if (transactionInput.amount === undefined) {
                setError("Please enter an amount");
                return;
            }
            if (transactionInput.amount > user.balance) {
                setError("You don't have enough balance in your wallet!");
                return;
            }
            if (transactionInput.upiId === undefined) {
                setError("Please enter a UPI ID");
                return;
            }
            const res = await axios.post("/send", transactionInput);
            setTransactionSuccess("Money sent successfully!");

            // updating user balance
            const updatedBalance =
                user.balance - Number(transactionInput.amount);
            user.balance = updatedBalance;

            const newTransaction = {
                sender_upi_id: user.upiId,
                receiver_upi_id: transactionInput.upiId,
                amount: transactionInput.amount,
                date: new Date(), // Optional: Use server response date if available
            };

            setTransactions((prevTransactions) => [
                newTransaction,
                ...prevTransactions,
            ]);

            setTransactionInput({});
            setOpenModal(false);
        } catch (e) {
            setError(e.response?.message || "Something went wrong");
        }
    };

    const chartData = transactions.map((transaction) => ({
        amount: transaction.amount,
        date: transaction.date,
    }));

    return (
        <>
            <Navbar />
            <div className="px-[10%] mt-10 relative">
                <div className="bg-white rounded p-6 pb-10">
                    <p className="text-[#63748a] mb-3">Total Balance</p>
                    <h1 className="font-bold text-3xl">₹ {user.balance}</h1>
                </div>
                <div className="flex rounded bg-white w-fit pl-6 pt-6 pb-10 pr-16 mt-7 items-center gap-x-5 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#3b82f6]"></div>
                    <p
                        onClick={() => setOpenModal((prev) => !prev)}
                        className="cursor-pointer"
                    >
                        Send Money
                    </p>
                </div>
                <div className="mt-7">
                    <h3 className="text-2xl font-semibold">
                        Transaction History
                    </h3>
                    {transactions.length === 0 ? (
                        <p>You have no previous transactions</p>
                    ) : (
                        transactions.map((transaction, i) => (
                            <div key={i}>
                                <Link to={`/transaction/${transaction._id}`}>
                                    <div className="flex items-center gap-x-3 mt-7 bg-white rounded p-4 justify-between items-center hover:bg-zinc-100 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="w-7 h-7 rounded-full bg-[#f6c23e] mr-3"></div>
                                            <p className="text-lg">
                                                {transaction.sender_upi_id ===
                                                user.upiId
                                                    ? transaction.receiver_upi_id
                                                    : transaction.sender_upi_id}
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                className={`${
                                                    transaction.sender_upi_id ===
                                                    user.upiId
                                                        ? "text-[#EF4444]"
                                                        : "text-[#10B981]"
                                                } text-lg`}
                                            >
                                                {" "}
                                                <span>
                                                    {transaction.sender_upi_id ===
                                                    user.upiId
                                                        ? "-"
                                                        : "+"}
                                                </span>{" "}
                                                ₹ {transaction.amount}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
                <div className="mt-10">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#8884d8"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {openModal && (
                    <div className="absolute top-[5%] md:left-[35%] bg-[#ffffff] rounded-md p-10 md:w-[35%] w-[65%] shadow-xl">
                        <h3 className="text-2xl font-semibold">Send Money</h3>
                        <hr className="bg-[#e2e8f0] h-1 my-3" />
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
                        {transactionSuccess && (
                            <div className="bg-[#88e14c61] px-4 py-2 rounded-md border-2 border-green-600 flex justify-between">
                                <p className="text-green-700">
                                    {transactionSuccess}
                                </p>
                                <i
                                    className="ri-close-large-fill text-green-700 cursor-pointer"
                                    title="close"
                                    onClick={() => setTransactionSuccess(null)}
                                ></i>
                            </div>
                        )}
                        <form
                            className="flex flex-col gap-y-3"
                            onSubmit={handleSendMoney}
                        >
                            <label htmlFor="upiId" className="text-[#5c5c5c]">
                                Receipent's UPI ID
                            </label>
                            <input
                                type="text"
                                placeholder="Enter receiver's upiId"
                                name="upiId"
                                onChange={handleTransactionInputChange}
                                className="p-2 rounded bg-[#f8fafc] border-2 outline-none"
                            />
                            <label htmlFor="amount" className="text-[#5c5c5c]">
                                Amount
                            </label>
                            <input
                                type="number"
                                placeholder="Enter amount"
                                name="amount"
                                onChange={handleTransactionInputChange}
                                className="p-2 rounded bg-[#f8fafc] border-2 border-[##f9fafc] outline-none"
                            />
                            <small className="text-[#5c5c5c]">
                                Available Balance: ₹{user.balance}
                            </small>
                            <button
                                type="submit"
                                className="bg-blue-500 rounded-md p-2 text-white"
                            >
                                Send Money
                            </button>
                            <button
                                onClick={() => setOpenModal((prev) => !prev)}
                                className="bg-gray-200 p-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
