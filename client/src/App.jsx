import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import TransactionDetail from "./components/TransactionDetail";
import Home from "./components/Home";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />{" "}
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/transaction/:id"
                    element={
                        <ProtectedRoute>
                            <TransactionDetail />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
