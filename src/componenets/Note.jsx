import React from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const Note = ({ title, date, content }) => {
    return (
        <div className="bg-slate-700/20 w-[45%] rounded-2xl flex flex-col text-white p-3 text-ellipsis ">
            <div className="flex items-center justify-between gap-3">
                <h1 className="text-xl font-bold leading-loose self-center w-full text-ellipsis whitespace-nowrap overflow-hidden">
                    {title}
                </h1>
                <div className="flex gap-2">
                    <MdEdit className="cursor-pointer text-amber-300" />
                    <MdDelete className="cursor-pointer text-red-500" />
                </div>
            </div>
            <p className="mt-0 leading-2 mb-3 text-xs text-gray-500">{date}</p>
            <p className="px-2 py-3 bg-zinc-700 rounded-xl overflow-hidden line-clamp-8">
                {content}
            </p>
        </div>
    );
};
Note.defaultProps = {
    title: "Untitled",
    date: "no date",
    content: "No content yet",
};

export default Note;
