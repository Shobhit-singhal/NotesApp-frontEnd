import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showCnfPass, setShowCnfPass] = useState(false);
    const [gender, setGender] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            username + " " + password + " " + cnfPassword + " " + gender
        );
        setUsername("");
        setPassword("");
        setCnfPassword("");
        setGender("");
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
            <div className=" backdrop-blur-md rounded-xl ring-2 ring-gray-300/40 px-6 py-14 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/3 items-center gap-7 hover:shadow-md shadow-white hover:backdrop-blur-lg hover:outline-1 outline-white transition-all ease-in duration-200 md:px-10 md:py-20">
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
                        <button
                            className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                            onClick={handleShowPassChange}
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="w-full relative">
                        <input
                            value={cnfPassword}
                            onChange={(e) => setCnfPassword(e.target.value)}
                            type={showCnfPass ? "text" : "password"}
                            className="border-2 text-white md:text-black focus:border-white outline-0 w-full border-gray-50/40 rounded-full px-5 py-2"
                            placeholder="Confirm Password"
                        />
                        <button
                            className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                            onClick={handleShowCnfPassChange}
                        >
                            {showCnfPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === "male"}
                                onClick={(e) => {
                                    setGender(e.target.value);
                                }}
                                id="male"
                            />
                            <label for="male"> Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === "female"}
                                onClick={(e) => {
                                    setGender(e.target.value);
                                }}
                                id="female"
                            />
                            <label for="female"> Female</label>
                        </div>
                    </div>

                    <input
                        type="submit"
                        name="login"
                        value="Sign Up"
                        className="bg-white rounded-full py-2 cursor-pointer font-mono text-md font-light"
                    />
                </form>
            </div>
        </div>
    );
};

export default Register;
