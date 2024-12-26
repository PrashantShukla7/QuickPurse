// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../utils/axios";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Check auth on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await axios.get("/auth/me");
            setIsAuthenticated(true);
            setUser(res.data.user);
        } catch {
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const res = await axios.post("/api/auth/login", credentials);
            setAuth({
                isAuthenticated: true,
                user: res.data.user,
                loading: false,
            });
            return true;
        } catch (error) {
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            setAuth({
                isAuthenticated: false,
                user: null,
                loading: false,
            });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, loading, login, logout, checkAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};
