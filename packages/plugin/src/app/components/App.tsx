import React from "react";
import Login from "./Login";
import { useRoutes } from "../hooks/routes";

const App = () => {
  const [currentRoute] = useRoutes();
  if (currentRoute === "/") {
    return <Login />;
  }
  return null;
};

export default App;
