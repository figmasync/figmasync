import React, { useEffect, useState } from "react";
import { useGithub } from "../hooks/github";
import { github } from "../../api";
const ListIssue = () => {
  const [isLoading, setLoading] = useState(false);
  const [issues, setIssues] = useState<any[]>([]);
  const { token } = useGithub();
  useEffect(() => {
    (async () => {
      if (token?.access_token) {
        console.log(token?.token_type);
        setLoading(true);
        try {
          const response = await github.getAllIssues(
            token.access_token,
            token?.token_type
          );
          setIssues(response);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [token]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {issues.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </div>
  );
};

export default ListIssue;
