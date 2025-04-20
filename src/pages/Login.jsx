import axios from "axios";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {
    const [errorLogging, setErrorLoggin] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [rem, setRem] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (details) => {
        try {
            let res = await login(details);
            localStorage.setItem("jwt_token", res.data.token);
            console.log(localStorage.getItem("jwt_token"));
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    const handleInvalidCredential = (e) => {
        setErrorLoggin(false);
        console.log(errorLogging);
    };
    const handleShowPassChange = (e) => {
        e.preventDefault();
        setShowPass(!showPass);
    };
    const login = async (details) => {
        try {
            const user = details;
            const data = await axios.post(
                "http://localhost:8080/public/login",
                user
            );
            return data;
        } catch (err) {
            setErrorLoggin(true);
            console.log("Error logging in: ", err);
        }
    };

    return (
        <div
            className="h-screen bg-[url('/images/phoneBg.jpg')] md:bg-[url('/images/desktopBg.jpg')] bg-bottom bg-cover
        relative flex items-center justify-center"
        >
            <div
                className="font-serif backdrop-blur-md rounded-xl ring-2 ring-gray-300/40 px-6 py-14 flex flex-col  w-3/4  max-w-[500px] items-center gap-7 hover:shadow-md shadow-white hover:backdrop-blur-lg
              hover:outline-1 outline-white transition-all ease-in duration-200 md:px-10 md:py-20 relative"
            >
                <div
                    className={`absolute h-1/3 w-2/3 rounded-xl z-10 items-center justify-center gap-5 flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500 shadow-xl text-white border-2 flex border-gray-50/40 ${
                        errorLogging ? "" : "hidden"
                    } `}
                >
                    <p className="text-xl ">Invalid credentials</p>
                    <button
                        className="bg-blue-600 cursor-pointer px-10 py-1 rounded-xl text-white border border-black"
                        onClick={handleInvalidCredential}
                    >
                        Ok
                    </button>
                </div>
                <p className=" text-2xl font-bold text-white">Login</p>
                <form
                    className="flex-col gap-4 flex w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full relative flex flex-col gap-1">
                        <div className="w-full relative">
                            <input
                                {...register("username", {
                                    required: {
                                        value: true,
                                        message: "Username is required",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Username must be atleast 3 characters",
                                    },
                                })}
                                type="text"
                                className={`border-2  md:text-black focus:border-white outline-0  rounded-full px-5 py-2 w-full text-white ${
                                    errors.username
                                        ? "border-red-600 "
                                        : "border-gray-50/40 "
                                }`}
                                placeholder="Username"
                            />
                            <FaUser className="absolute top-1/2 -translate-y-1/2 right-5" />
                        </div>
                        <p className="text-red-600 text-sm px-5">
                            {errors.username && errors.username.message}
                        </p>
                    </div>
                    <div className="w-full relative flex flex-col gap-1">
                        <div className="w-full relative">
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "password must atleast be 3 characters",
                                    },
                                })}
                                type={showPass ? "text" : "password"}
                                className={`border-2  md:text-black focus:border-white outline-0 rounded-full px-5 py-2 w-full text-white ${
                                    errors.password
                                        ? "border-red-600"
                                        : "border-gray-50/40 "
                                }`}
                                placeholder="Password"
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                                onClick={handleShowPassChange}
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <p className="text-red-600 text-sm px-5">
                            {errors.password && errors.password.message}
                        </p>
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
                        value={isSubmitting ? "Logging in" : "Login"}
                        disabled={isSubmitting || errorLogging}
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
