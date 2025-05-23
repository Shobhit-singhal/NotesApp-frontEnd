import { MdDelete } from "react-icons/md";
import React from "react";
import axios from "axios";

const ToDo = ({ id, task, isCompleted, onDelete, onUpdate }) => {
    const completed = "bg-[#5ad846]";
    const notCompleted = "bg-[#f26262]";

    const handleDelete = async (e) => {
        e.stopPropagation();
        console.log("Delete for id: ", id);
        try {
            let token = localStorage.getItem("jwt_token");
            let res = await axios({
                method: "delete",
                url: `http://localhost:8080/todo/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res);
            onDelete(id);
        } catch (err) {
            console.log(err);
        }
    };
    const handleUpdate = async (e) => {
        console.log("Update for id: ", id);
        try {
            let token = localStorage.getItem("jwt_token");
            let res = await axios({
                method: "put",
                url: `http://localhost:8080/todo/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res);
            onUpdate(id);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            className={`w-full h-14 rounded-md  flex items-center px-5 cursor-pointer text-xl relative
    ${isCompleted ? completed : notCompleted}`}
            onClick={handleUpdate}
        >
            <div className="w-3/4">{task}</div>
            <div className="text-xs absolute right-5 flex gap-5 items-center ">
                <div
                    className="bg-white hover:bg-slate-300 text-lg flex items-center justify-center rounded-full h-8 w-8"
                    onClick={handleDelete}
                >
                    <MdDelete />
                </div>
                <p className="bg-slate-400/80 px-3 py-0.5 rounded-md text-black w-20 text-wrap text-center leading-tight border-[1.6px] border-dashed border-black/70">
                    {isCompleted ? "Completed" : "Not Completed"}
                </p>
            </div>
        </div>
    );
};

export default ToDo;
