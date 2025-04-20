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
    const [task, setTask] = useState("");
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem("jwt_token");
            let res = await axios({
                method: "post",
                url: "http://localhost:8080/todo",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                data: { task },
            });
            console.log(res);
            setTodos((prevTodo) => [...prevTodo, res.data]);
        } catch (err) {
            console.log(err);
        }
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
                    <form
                        onSubmit={handleAdd}
                        className=" mt-4 gap-3 flex justify-between bg-white w-full  py-2 rounded-md relative"
                    >
                        <input
                            type="text"
                            placeholder="Enter New To Do"
                            className="px-5 outline-0  flex-1"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                        <button
                            className="mr-5 flex items-center h-8 w-8  justify-center  rounded-md cursor-pointer bg-blue-400 "
                            name=""
                            id=""
                        >
                            <FaPlus className="text-lg" />
                        </button>
                    </form>
                    <div className="flex flex-wrap w-full gap-3 justify-center py-6">
                        {!loading &&
                            (todos.length > 0 ? (
                                todos.map((todo, idx) => (
                                    <ToDo
                                        key={idx}
                                        id={todo.id}
                                        task={todo.task}
                                        isCompleted={todo.completed}
                                        onDelete={(id) => {
                                            setTodos((prevTodo) =>
                                                prevTodo.filter(
                                                    (n) => n.id !== id
                                                )
                                            );
                                        }}
                                        onUpdate={(id) => {
                                            setTodos((prevTodo) =>
                                                prevTodo.map((todo) =>
                                                    todo.id !== id
                                                        ? todo
                                                        : {
                                                              ...todo,
                                                              completed:
                                                                  !todo.completed,
                                                          }
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
            </div>
        </div>
    );
};

export default ToDoFront;
