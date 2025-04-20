import React, { use, useEffect, useState } from "react";
import Note from "../componenets/Note";
import Navbar from "../componenets/Navbar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserGreet from "../componenets/UserGreet";

const AddNote = () => {
    const navigate = useNavigate();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (details) => {
        console.log(details);
        try {
            let token = localStorage.getItem("jwt_token");
            let data = await axios({
                method: "post",
                url: "http://localhost:8080/notes",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                data: details,
            });
            console.log(data);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            className="min-h-screen w-full"
            style={{
                background: "linear-gradient(315deg, #04524B, #011F79)",
            }}
        >
            <div className="w-full max-w-[700px] backdrop-blur-[100px] hover:shadow-md shadow-gray-400 m-auto flex flex-col font-serif items-center rounded-xl relative">
                <Navbar />
                <UserGreet />
                <div className="w-full bg-slate-900/60 m-2 rounded-xl flex flex-col mt-4 items-center px-4">
                    <div className="text-xl text-white mt-3 bg-slate-900/70 w-full text-center py-2">
                        Add a Note
                    </div>
                    <form
                        className="w-full my-14 flex flex-col gap-5 "
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="w-full relative flex flex-col gap-1">
                            <input
                                type="text "
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Title can't be empty",
                                    },
                                })}
                                className={`text-white h-10 px-4 py-2 rounded-xl bg-slate-700 w-full outline-0 font-bold tracking-wider ${
                                    errors.title ? "border border-red-500" : ""
                                }`}
                                placeholder="Enter the title"
                            />
                            <p className="text-red-600 text-sm px-5">
                                {errors.title && errors.title.message}
                            </p>
                        </div>
                        <div className="w-full relative flex flex-col gap-1">
                            <textarea
                                {...register("content", {
                                    required: {
                                        value: true,
                                        message: "The content can't be empty",
                                    },
                                })}
                                className={`text-white px-4 py-2 rounded-xl bg-slate-700 outline-0 resize-none w-full min-h-[150px] ${
                                    errors.title ? "border border-red-500" : ""
                                }`}
                                placeholder="Enter the content"
                            />
                            <p className="text-red-600 text-sm px-5">
                                {errors.content && errors.content.message}
                            </p>
                        </div>

                        <input
                            type="submit"
                            value={isSubmitting ? "Adding Note.." : "Add note"}
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white text-xl tracking-wider rounded-2xl py-2 cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
