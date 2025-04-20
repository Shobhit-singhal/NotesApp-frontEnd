import React, { use, useEffect, useState } from "react";
import Note from "../componenets/Note";
import Navbar from "../componenets/Navbar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import UserGreet from "../componenets/UserGreet";
import ToDo from "../componenets/ToDo";

const ToDoFront = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleAdd = (e) => {
        e.preventDefault();
        navigate("/add");
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                let token = localStorage.getItem("jwt_token");
                let res = await axios({
                    method: "get",
                    url: "http://localhost:8080/todo",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                setTodos(res.data);
            } catch (err) {
                console.log(err);
                if (err.status == 401) {
                    navigate("/login");
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
                <UserGreet />
                <div className="w-full bg-slate-900/60 m-2 rounded-xl flex flex-col mt-4 items-center px-4">
                    <div className="text-xl text-white mt-3 bg-slate-900/70 w-full text-center py-2">
                        Your To-Dos
                    </div>
                    <div className="flex flex-wrap w-full gap-3 justify-center py-6">
                        {!loading &&
                            (todos.length > 0 ? (
                                todos.map((todo, idx) => (
                                    <ToDo
                                        key={idx}
                                        id={todo.id}
                                        task={todo.task}
                                        // isCompleted={true}
                                        isCompleted={todo.isCompleted}
                                        onDelete={(id) => {
                                            setTodos((prevTodo) =>
                                                prevTodo.filter(
                                                    (n) => n.id !== id
                                                )
                                            );
                                        }}
                                    />
                                ))
                            ) : (
                                <p className="text-white text-xl font-bold leading-loose my-10">
                                    No todos found{" "}
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

export default ToDoFront;
