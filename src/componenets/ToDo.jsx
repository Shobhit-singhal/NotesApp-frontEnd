import { MdDelete } from "react-icons/md";
import React from "react";

const ToDo = ({ id, task, isCompleted, onDelete }) => {
    const completed = "bg-[#5ad846]";
    const notCompleted = "bg-[#f26262]";

    const handleDelete = (e) => {
        e.stopPropagation();
        console.log("Delete for id: ", id);
    };
    const handleUpdate = (e) => {
        console.log("Update for id: ", id);
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
