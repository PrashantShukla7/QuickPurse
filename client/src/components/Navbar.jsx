import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
      if (isAuthenticated) setLoggedIn(true);
    }, [isAuthenticated]);

    return (
        <nav className="flex justify-between items-center px-[5%] py-4 bg-[#ffffff] shadow-[#0000000d]">
            <div>
                <h2 className="text-[#353f4c] font-bold text-2xl">
                    <span className="text-[#3B82F6]">Quick</span>Purse
                </h2>
            </div>
            {loggedIn ? (
                <ul className="flex gap-x-4 text-[#63748a]">
                    <li className="cursor-pointer hover:text-[#293038]">
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className="cursor-pointer hover:text-[#293038]">
                        Profile
                    </li>
                </ul>
            ) : (
                <ul className="flex gap-x-4 text-[#63748a]">
                    <li className="cursor-pointer hover:text-[#293038]">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="cursor-pointer hover:text-[#293038]">
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
