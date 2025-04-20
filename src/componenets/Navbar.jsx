import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
    const style = {
        background:
            "linear-gradient(90deg,rgba(25, 25, 112, 1) 0%, rgba(41, 61, 133, 1) 50%, rgba(36, 135, 76, 1) 100%)",
    };
    const [showNavbar, setShowNavbar] = useState(true);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = (e) => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setShowNavbar(false); // scrolling down
            } else {
                setShowNavbar(true); // scrolling up
            }

            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={` w-full flex justify-between rounded-t-xl text-white text-lg py-1 px-4 sticky top-0 ${
                showNavbar ? "translate-y-0" : "-translate-y-full"
            } transition-all ease-it duration-200`}
            style={style}
        >
            <div
                onClick={scrollToTop}
                className="font-mono italic font-bold cursor-pointer"
            >
                My Notes
            </div>
            <ul className="flex gap-5">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "text-purple-400 font-bold"
                                : "text-gray-900"
                        } hover:bg-slate-600/30`
                    }
                >
                    Notes
                </NavLink>
                <NavLink
                    to="/todo"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "text-purple-400 font-bold"
                                : "text-gray-900"
                        } hover:bg-slate-600/30`
                    }
                >
                    To do
                </NavLink>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `${
                            isActive
                                ? "text-purple-400 font-bold"
                                : "text-gray-900"
                        } hover:bg-slate-600/30`
                    }
                >
                    Log out
                </NavLink>
            </ul>
        </div>
    );
};

export default Navbar;
