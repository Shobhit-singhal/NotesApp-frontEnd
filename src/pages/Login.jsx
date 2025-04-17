import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username + " " + password);
        setUsername("");
        setPassword("");
    };
    return (
        <div
            className="h-screen bg-[url('/images/phoneBg.jpg')] md:bg-[url('/images/desktopBg.jpg')] bg-bottom bg-cover
        relative"
        >
            <div
                className=" backdrop-blur-md rounded-xl ring-2 ring-gray-300/40 px-14 py-14 flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/3 items-center gap-7
                hover:shadow-md shadow-white hover:backdrop-blur-lg
              hover:outline-1 outline-white transition-all ease-in duration-200 md:px-28 md:py-20"
            >
                <p className=" text-2xl font-bold text-white">Login</p>
                <form className="flex-col gap-4 flex" onSubmit={handleSubmit}>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="border-2 focus:border-white outline-0 border-gray-50/40 rounded-full px-5 py-2"
                        placeholder="Username"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="Password"
                        className="border-2 focus:border-white outline-0  border-gray-50/40 rounded-full px-5 py-2"
                        placeholder="Password"
                    />
                    <div className="flex justify-between text-xs text-white font-bold">
                        <p className="cursor-pointer">Remember me</p>
                        <p className="cursor-pointer">Forgot Password?</p>
                    </div>
                    <input
                        type="submit"
                        name="login"
                        value="Login"
                        className="bg-white rounded-full py-2 cursor-pointer font-mono text-md font-light"
                    />
                </form>
                <p className="font-light text-sm text-white font-mono whitespace-nowrap">
                    Don't have an account?
                    <span className="font-bold cursor-pointer"> Register</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
