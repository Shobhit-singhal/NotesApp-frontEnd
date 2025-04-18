import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Reigster";
import { Route, Routes } from "react-router-dom";
import UserUi from "./pages/UserUi";

const App = () => {
    return (
        <div className="w-full min-h-screen">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/notes" element={<UserUi />}></Route>
            </Routes>
        </div>
    );
};

export default App;
