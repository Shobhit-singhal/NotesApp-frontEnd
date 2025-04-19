import axios from "axios";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { SiOutline } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showCnfPass, setShowCnfPass] = useState(false);
    const [gender, setGender] = useState("");
    const [validUsername, setValidUsername] = useState(true);
    const [validPasswrod, setValidPasswrod] = useState(true);
    const [validCnfPasswrod, setValidCnfPasswrod] = useState(true);
    const [validGender, setValidGender] = useState(true);
    const navigate = useNavigate();

    const register = async () => {
        const user = {
            username,
            password,
            gender,
        };
        let req = await axios.post(
            "http://localhost:8080/public/register",
            user
        );
        return req;
    };
    const clearData = () => {
        setUsername("");
        setPassword("");
        setCnfPassword("");
        setGender("");
    };
    const validateForm = () => {
        let isValid = true;
        if (username.trim() == "") {
            setValidUsername(false);
            isValid = false;
        }
        if (password.trim() == "") {
            setValidPasswrod(false);
            isValid = false;
        }
        if (cnfPassword.trim() == "" || password != cnfPassword) {
            setValidCnfPasswrod(false);
            isValid = false;
        }
        if (gender.trim == "") {
            setValidGender(false);
            isValid = false;
        }
        return isValid;
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (validateForm()) {
                e.preventDefault();
                let res = await register();
                clearData();
                console.log(res);
                navigate("/login");
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                alert("Username already taken!");
            } else {
                alert("Something went wrong");
                console.log(err);
            }
        }
    };
    const handleShowPassChange = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    };
    const handleShowCnfPassChange = (e) => {
        e.preventDefault();
        setShowCnfPass(!showCnfPass);
    };
    return (
        <div className="h-screen bg-[url('/images/phoneBg.jpg')] md:bg-[url('/images/desktopBg.jpg')] bg-bottom bg-cover relative">
            <div className="font-serif backdrop-blur-md rounded-xl ring-2 ring-gray-300/40 px-6 py-14 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-[500px] items-center gap-7 hover:shadow-md shadow-white hover:backdrop-blur-lg hover:outline-1 outline-white transition-all ease-in duration-200 md:px-10 md:py-20">
                <p className=" text-2xl font-bold text-white">Register</p>
                <form
                    className="flex-col gap-4 flex w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full relative ">
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="border-2 text-white md:text-black focus:border-white outline-0 border-gray-50/40 rounded-full px-5 py-2 w-full"
                            placeholder="Username"
                        />
                        <FaUser className="absolute top-1/2 -translate-y-1/2 right-5" />
                    </div>
                    <div className="w-full relative">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPass ? "text" : "password"}
                            className="border-2 text-white md:text-black focus:border-white outline-0 w-full border-gray-50/40 rounded-full px-5 py-2"
                            placeholder="Password"
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                            onClick={handleShowPassChange}
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>

                    <div className="w-full relative">
                        <input
                            value={cnfPassword}
                            onChange={(e) => setCnfPassword(e.target.value)}
                            type={showCnfPass ? "text" : "password"}
                            className="border-2 text-white md:text-black focus:border-white outline-0 w-full border-gray-50/40 rounded-full px-5 py-2"
                            placeholder="Confirm Password"
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                            onClick={handleShowCnfPassChange}
                        >
                            {showCnfPass ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onChange={(e) => {
                                    setGender(e.target.value);
                                }}
                                className="cursor-pointer"
                                id="male"
                            />
                            <label
                                htmlFor="male"
                                className="text-white md:text-black cursor-pointer"
                            >
                                {" "}
                                Male
                            </label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onChange={(e) => {
                                    setGender(e.target.value);
                                }}
                                className="cursor-pointer"
                                id="female"
                            />
                            <label
                                htmlFor="female"
                                className="text-white md:text-black cursor-pointer"
                            >
                                {" "}
                                Female
                            </label>
                        </div>
                    </div>

                    <input
                        type="submit"
                        name="login"
                        value="Sign Up"
                        className="bg-white rounded-full py-2 cursor-pointer font-mono text-md font-light"
                    />
                </form>
                <p className="text-white font-mono text-sm">
                    Already have an account?
                    <span
                        className="font-bold cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        {" "}
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
