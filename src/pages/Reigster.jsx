import axios from "axios";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { SiOutline } from "react-icons/si";
import { data, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../componenets/Spinner";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [showCnfPass, setShowCnfPass] = useState(false);
    const [conflict, setConflict] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    const onSubmit = async (details) => {
        const newDetails = {
            username: details.username,
            password: details.password,
            gender: details.gender,
        };
        console.log(newDetails);

        try {
            let req = await axios({
                method: "post",
                url: "http://localhost:8080/public/register",
                headers: {
                    "Content-Type": "application/json",
                },
                data: newDetails,
            });
            console.log(req);
            navigate("/login");
        } catch (err) {
            console.log(err);
            setConflict(true);
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
    const handleConflict = () => {
        setConflict(false);
    };
    return (
        <div className="h-screen bg-[url('/images/phoneBg.jpg')] md:bg-[url('/images/desktopBg.jpg')] bg-bottom bg-cover relative flex items-center justify-center">
            <div className="font-serif backdrop-blur-md rounded-xl ring-2 ring-gray-300/40 px-6 py-14 flex flex-col  w-3/4  max-w-[500px] items-center gap-7 hover:shadow-md shadow-white hover:backdrop-blur-lg hover:outline-1 outline-white transition-all ease-in duration-200 md:px-10 md:py-20 relative">
                <div
                    className={`absolute h-1/3 w-2/3 rounded-xl z-10 items-center justify-center gap-5 flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500 shadow-xl text-white border-2 flex border-gray-50/40 ${
                        conflict ? "" : "hidden"
                    } `}
                >
                    <p className="text-xl ">Username is taken</p>
                    <button
                        className="bg-blue-600 cursor-pointer px-10 py-1 rounded-xl text-white border border-black"
                        onClick={handleConflict}
                    >
                        Ok
                    </button>
                </div>
                <p className=" text-2xl font-bold text-white">Register</p>
                <form
                    className="flex-col gap-4 flex w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full relative flex flex-col gap-1">
                        <div className="w-full relative ">
                            <input
                                {...register("username", {
                                    required: {
                                        value: true,
                                        message: "Username can't be empty",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Username must be atleast 3 characters",
                                    },
                                })}
                                type="text"
                                className={`border-2  md:text-black focus:border-white outline-0 rounded-full px-5 py-2 w-full text-white ${
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
                                        message: "Password can't be empty",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Password must be atleast 3 characters",
                                    },
                                })}
                                type={showPass ? "text" : "password"}
                                className={`border-2  md:text-black focus:border-white outline-0 rounded-full px-5 py-2 w-full text-white ${
                                    errors.password
                                        ? "border-red-600 "
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
                    <div className="w-full relative flex flex-col gap-1">
                        <div className="w-full relative">
                            <input
                                {...register("cnfPassword", {
                                    required: {
                                        value: true,
                                        message: "Password can't be empty",
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Password must be atleast 3 characters",
                                    },
                                    validate: (value) => {
                                        if (value !== watch("password")) {
                                            return "Passwords do not match";
                                        }
                                    },
                                })}
                                type={showCnfPass ? "text" : "password"}
                                className={`border-2  md:text-black focus:border-white outline-0 rounded-full px-5 py-2 w-full text-white ${
                                    errors.cnfPassword
                                        ? "border-red-600 "
                                        : "border-gray-50/40 "
                                }`}
                                placeholder="Confirm Password"
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
                                onClick={handleShowCnfPassChange}
                            >
                                {showCnfPass ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <p className="text-red-600 text-sm px-5">
                            {errors.cnfPassword && errors.cnfPassword.message}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                {...register("gender", {
                                    required: {
                                        value: true,
                                        message: "Please select your gender",
                                    },
                                })}
                                value="male"
                                className="cursor-pointer"
                                id="male"
                            />
                            <label
                                htmlFor="male"
                                className={` cursor-pointer ${
                                    errors.gender
                                        ? "text-red-500"
                                        : "text-white md:text-black"
                                }`}
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
                                className="cursor-pointer"
                                {...register("gender", {
                                    required: {
                                        value: true,
                                        message: "Please select your gender",
                                    },
                                })}
                                id="female"
                            />
                            <label
                                htmlFor="female"
                                className={`cursor-pointer ${
                                    errors.gender
                                        ? "text-red-500 "
                                        : "text-white md:text-black"
                                }`}
                            >
                                {" "}
                                Female
                            </label>
                        </div>
                    </div>

                    <input
                        type="submit"
                        name="login"
                        value={isSubmitting ? "Signing Up" : "Sign Up"}
                        className="bg-white rounded-full py-2 cursor-pointer font-mono text-md font-light"
                        disabled={isSubmitting || conflict}
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
