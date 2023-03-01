import React from "react";
import { Link } from "react-router-dom";

// import { useRoutes } from "../hooks/routes";
const Initial = () => {
  return <div>Initial page
    <Link to={"/"} >Login</Link>
  </div>;
};

export default Initial;
