import axios from "axios";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState("");
    const [rem, setRem] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (username.trim() != "" && password.trim() != null) {
                let res = await login();
                setUsername("");
                setPassword("");
                localStorage.setItem("jwt_token", res.data.token);
                console.log(localStorage.getItem("jwt_token"));
                navigate("/");
            } else {
                console.log("Invalid data");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleShowPassChange = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    };
    const login = async () => {
        const user = { username, password };
        const data = await axios.post(
            "http://localhost:8080/public/login",
            user
        );
        return data;
    };

    return (
        <div
            className="h-screen bg-[url('/images/phoneBg.jpg')] md:bg-[url('/images/desktopBg.jpg')] bg-bottom bg-cover
        relative"
        >
            <div
                className="font-serif backdrop-blur-md rounded-xl ring-2 ring-gray-300/40 px-6 py-14 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4  max-w-[500px] items-center gap-7
                hover:shadow-md shadow-white hover:backdrop-blur-lg
              hover:outline-1 outline-white transition-all ease-in duration-200 md:px-10 md:py-20"
            >
                <p className=" text-2xl font-bold text-white">Login</p>
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
                    <div className="flex justify-between text-xs text-white font-bold">
                        <div className="cursor-pointer flex gap-2">
                            <input
                                type="checkbox"
                                name="remMe"
                                id="remMe"
                                checked={rem}
                                onChange={(e) => setRem(!rem)}
                            />
                            <label htmlFor="remMe" className="cursor-pointer">
                                Remember me
                            </label>
                        </div>
                        <p className="cursor-pointer">Forgot Password?</p>
                    </div>
                    <input
                        type="submit"
                        name="login"
                        value="Login"
                        className="bg-white rounded-full py-2 cursor-pointer font-mono text-md font-light"
                    />
                </form>
                <p className="font-light text-sm text-white font-mono whitespace-nowrap">
                    Don't have an account?
                    <span
                        className="font-bold cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        {" "}
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
