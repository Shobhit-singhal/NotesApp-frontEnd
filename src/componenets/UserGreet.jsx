import axios from "axios";
import React, { useState, useEffect } from "react";

const UserGreet = () => {
    const [name, setName] = useState("guest");
    useEffect(() => {
        const getUsername = async () => {
            try {
                let token = localStorage.getItem("jwt_token");
                let res = await axios({
                    method: "get",
                    url: "http://localhost:8080/user/info",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                setName(res.data.username);
            } catch (err) {
                console.log(err);
                if (err.response.status == 401) {
                    localStorage.setItem("jwt_token", "");

                    navigate("/login");
                }
            }
        };

        getUsername();
    }, []);
    return (
        <p className="text-white text-2xl mt-5 font-bold">
            Welcome{" "}
            <span className="text-yellow-500">{name.toUpperCase()}</span>
        </p>
    );
};

export default UserGreet;
