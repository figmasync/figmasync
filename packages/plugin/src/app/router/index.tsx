import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import ListIssue from '../components/ListIssue';
import Comments from "../components/Comments";

const CustomRouter = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/issues" element={<ListIssue />} />
                <Route path="/comments" element={<Comments />} />
            </Routes>
        </MemoryRouter>
    )
}

export default CustomRouter;