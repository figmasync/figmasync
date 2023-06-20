import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Login from "../routes/Login";
import ListIssue from '../routes/ListIssue';
import Comments from "../routes/Comments";
import CommentPreview from "../routes/CommentPreview";
const CustomRouter = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/issues" element={<ListIssue />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/preview" element={<CommentPreview />} />
            </Routes>
        </MemoryRouter>
    )
}

export default CustomRouter;