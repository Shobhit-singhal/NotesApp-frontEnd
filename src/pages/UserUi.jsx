import React, { use, useEffect, useState } from "react";
import Note from "../componenets/Note";
import Navbar from "../componenets/Navbar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UserUi = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const [name, setName] = useState("guest");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleAdd = (e) => {
        e.preventDefault();
        navigate("/add")
    };

    useEffect(() => {
        const getData = async () => {
            try {
                let token = localStorage.getItem("jwt_token");
                setLoading(true);
                const url =
                    search.trim() == ""
                        ? "http://localhost:8080/notes"
                        : `http://localhost:8080/notes/${search}`;
                let res = await axios({
                    method: "get",
                    url: url,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                setNotes(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        const debounceTimeout = setTimeout(() => {
            getData();
        }, 500);
        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [search]);

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
                if ((err.response.status == 401)) {
                    localStorage.setItem("jwt_token", "");

                    navigate("/login");
                }
            }
        };

        getUsername();
    }, []);

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
                        Your Notes
                    </div>
                    <form
                        className="h-9 mt-3 w-full flex gap-3"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white px-5 rounded-full outline-0 flex-1 "
                            placeholder="Search"
                        />
                        <button className="h-10 w-10 bg-blue-500 text-white  flex items-center justify-center rounded-full text-lg cursor-pointer">
                            <FaSearch />
                        </button>
                    </form>
                    <div className="flex flex-wrap w-full gap-3 justify-center py-6">
                        {!loading &&
                            (notes.length > 0 ? (
                                notes.map((note, idx) => (
                                    <Note
                                        key={idx}
                                        title={note.title}
                                        content={note.content}
                                        date={note.date}
                                    />
                                ))
                            ) : (
                                <p className="text-white text-xl font-bold leading-loose my-10">
                                    No notes found{" "}
                                </p>
                            ))}
                    </div>
                </div>
                <div
                    className="absolute bottom-5 right-5 h-14 w-14 flex items-center justify-center rounded-full bg-orange-300 hover:bg-orange-500 hover:text-white hover:outline-1 hover:scale-105  cursor-pointer"
                    onClick={handleAdd}
                >
                    <FaPlus className="text-xl" />
                </div>
            </div>
        </div>
    );
};

export default UserUi;
