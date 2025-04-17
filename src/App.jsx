import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Reigster";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <div className="w-full h-screen">
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
    );
};

export default App;
