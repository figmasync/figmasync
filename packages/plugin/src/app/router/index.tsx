import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Login";

const CustomRouter = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </MemoryRouter>
    )
}

export default CustomRouter;