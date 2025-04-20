import React, { use, useEffect, useState } from "react";
import Note from "../componenets/Note";
import Navbar from "../componenets/Navbar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
    const [name, setName] = useState("guest");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getUsername = async () => {
            try {
                let token = localStorage.getItem("jwt_token");
                let res = await axios({
                    method: "get",
                    url: "http://localhost:8080/user/info",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                setName(res.data.username);
            } catch (err) {
                console.log(err);
                if (err.response.status == 401) {
                    localStorage.setItem("jwt_token", "");

                    navigate("/login");
                }
            }
        };

        getUsername();
    }, []);

    const addNote = async () => {
        try {
            let token = localStorage.getItem("jwt_token");
            let note = {
                title,
                content,
            };
            let res = await axios({
                method: "post",
                url: "http://localhost:8080/notes",

                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                data: note,
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title, " ", content);
        if (title.trim() != "" && content.trim() != "") {
            let data = await addNote();
            console.log(data);
            setTitle("");
            setContent("");
            navigate("/");
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
                <p className="text-white text-2xl mt-5 font-bold">
                    Welcome{" "}
                    <span className="text-yellow-500">
                        {name.toUpperCase()}
                    </span>
                </p>
                <div className="w-full bg-slate-900/60 m-2 rounded-xl flex flex-col mt-4 items-center px-4">
                    <div className="text-xl text-white mt-3 bg-slate-900/70 w-full text-center py-2">
                        Add a Note
                    </div>
                    <form className="w-full my-14 flex flex-col gap-5 ">
                        <input
                            type="text "
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-white h-10 px-4 py-2 rounded-xl bg-slate-700 w-full outline-0 font-bold"
                            placeholder="Enter the title"
                        />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="text-white px-4 py-2 rounded-xl bg-slate-700 outline-0 resize-none w-full min-h-[150px]"
                            placeholder="Enter the content"
                        />
                        <input
                            type="submit"
                            value="Add note"
                            className="bg-blue-600 text-white text-xl tracking-wider rounded-2xl py-2 cursor-pointer"
                            onClick={handleSubmit}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
