import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Login from "../routes/Login";
import ListIssue from '../routes/ListIssue';
import Comments from "../routes/Comments";

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