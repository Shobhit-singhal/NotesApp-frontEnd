import React, { use, useEffect, useState } from "react";
import Note from "../componenets/Note";
import Navbar from "../componenets/Navbar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserUi = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch("");
    };
    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                let token = localStorage.getItem("jwt_token");
                console.log(`Bearer ${token}`);
                let res = await axios({
                    method: "get",
                    url: "http://localhost:8080/notes",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                setNotes(res.data);
            } catch (err) {
                console.log(err);
                if ((err.response.status = 401)) {
                    localStorage.setItem("jwt_token", "");

                    navigate("/");
                }
            } finally {
                setLoading(false);
            }
        };
        getData();
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
                    Welcome User!
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
            </div>
        </div>
    );
};

export default UserUi;
