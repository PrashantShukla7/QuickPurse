import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axios.js";

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
            setTransactions(res.data.transactions);
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
            if (transactionInput.upiId === undefined) {
                setError("Please enter a UPI ID");
                return;
            }
            const res = await axios.post("/send", transactionInput);
            setTransactionSuccess("Money sent successfully!");
        } catch (e) {
            setError(e.response?.message || "Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <div className="px-[10%] mt-10 relative">
                <div className="bg-white rounded p-6 pb-10">
                    <p className="text-[#63748a] mb-3">Total Balance</p>
                    <h1 className="font-bold text-3xl">₹ {user.balance}</h1>
                </div>
                <div className="flex rounded bg-white w-fit pl-6 pt-6 pb-10 pr-16 mt-7 items-center gap-x-5">
                    <div className="w-10 h-10 rounded-full bg-[#3b82f6]"></div>
                    <p  onClick={() => setOpenModal(prev => !prev)} className="cursor-pointer">Send Money</p>
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
                                <div className="flex items-center gap-x-3 mt-7 bg-white rounded p-4 justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="w-7 h-7 rounded-full bg-[#f6c23e] mr-3"></div>
                                        <p className="text-lg">
                                            {transaction.sender_upi_id ===
                                            user.upiId
                                                ? transaction.receiver_upi_id
                                                : user.name}
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
                            </div>
                        ))
                    )}
                </div>

                {openModal && (
                    <div className="absolute top-[20%] left-[35%] bg-white rounded-md p-10 ">
                        <h3 className="text-2xl font-semibold">
                            Transfer Money
                        </h3>
                        <hr className="bg-[#e2e8f0] h-1 my-3" />
                        <form
                            className="flex flex-col gap-y-3"
                            onSubmit={handleSendMoney}
                        >
                            <label htmlFor="upiId">Receipent's UPI ID</label>
                            <input
                                type="text"
                                placeholder="Enter receiver's upiId"
                                name="upiId"
                                onChange={handleTransactionInputChange}
                                className="mt-3 p-2 rounded bg-[#1e293b]"
                            />
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                placeholder="Enter amount"
                                name="amount"
                                onChange={handleTransactionInputChange}
                            />
                            <small>Available Balance: ₹{user.balance}</small>
                            <button type="submit">Send</button>
                            <button onClick={() => setOpenModal(prev => !prev)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
