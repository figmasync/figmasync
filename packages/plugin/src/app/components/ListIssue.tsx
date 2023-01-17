import React, { useEffect } from "react";
import { useGithub } from "../hooks/github";
const ListIssue = () => {
  const { token } = useGithub();
  return <div>List issues assigned</div>;
};

export default ListIssue;
