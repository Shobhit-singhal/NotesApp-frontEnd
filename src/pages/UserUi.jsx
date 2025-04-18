import React, { useState } from "react";
import Note from "../componenets/Note";
import Navbar from "../componenets/Navbar";
import { FaSearch } from "react-icons/fa";

const UserUi = () => {
  const [search, setSearch] = useState("");
  const handleSubmit=(e)=>{
    e.preventDefault();
    setSearch("");

  }
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
                    <form className="h-9 mt-3 w-full flex gap-3" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            className="bg-white px-5 rounded-full outline-0 flex-1 "
                            placeholder="Search"
                        />
                        <button className="h-10 w-10 bg-blue-500 text-white  flex items-center justify-center rounded-full text-lg cursor-pointer">
                            <FaSearch />
                        </button>
                    </form>
                    <div className="flex flex-wrap w-full gap-3 justify-center py-6">
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                        <Note title="title" date="date" content="content" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserUi;
