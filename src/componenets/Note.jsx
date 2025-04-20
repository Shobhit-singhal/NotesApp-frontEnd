import axios from "axios";
import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Note = ({ id, title, date, content, onDelete }) => {
    const navigate = useNavigate();
    const handleClick = async (e) => {
        console.log("update for id: ", id);
        navigate(`/update/${id}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        console.log("delete for id: ", id);
        try {
            let token = localStorage.getItem("jwt_token");
            let res = await axios({
                method: "delete",
                url: `http://localhost:8080/notes/${id}`,
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
    return (
        <div
            className="bg-slate-700/20 w-[45%] rounded-2xl flex flex-col text-white p-3 text-ellipsis cursor-pointer hover:bg-slate-700/30"
            onClick={handleClick}
        >
            <div className="flex items-center justify-between gap-3">
                <h1 className="text-xl font-bold leading-loose self-center w-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {title}
                </h1>
                <div className="flex gap-2">
                    <div className="cursor-pointer text-red-500 text-xl hover:bg-gray-500/20 rounded-full p-1">
                        <MdEdit className="cursor-pointer text-amber-300 text-xl" />
                    </div>
                    <div
                        className="cursor-pointer text-red-500 text-xl hover:bg-gray-500/20 rounded-full p-1"
                        onClick={handleDelete}
                    >
                        <MdDelete />
                    </div>
                </div>
            </div>
            <p className="mt-0 leading-2 mb-3 text-xs text-gray-500">{date}</p>
            <textarea
                disabled={true}
                className="resize-none px-2 py-3 bg-zinc-700 rounded-xl overflow-hidden overflow-ellipsis line-clamp-3 h-22 "
                value={content}
            />
        </div>
    );
};
Note.defaultProps = {
    title: "Untitled",
    date: "no date",
    content: "No content yet",
};

export default Note;
