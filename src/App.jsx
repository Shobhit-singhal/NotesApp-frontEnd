import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Reigster";
import { Route, Routes } from "react-router-dom";
import UserUi from "./pages/UserUi";
import AddNote from "./pages/AddNote";
import UpdateNote from "./pages/UpdateNote";

const App = () => {
    return (
        <div className="w-full min-h-screen">
            <Routes>
                <Route path="/" element={<UserUi />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add" element={<AddNote />} />
                <Route path="/update/:id" element={<UpdateNote />} />
            </Routes>
        </div>
    );
};

export default App;
