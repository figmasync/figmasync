import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGithub } from "../hooks/github";
import { github } from "../../api";
import "../css/list-issue.css";

const GithubIssuesList = ({ issues = [] }) => {
  const navigate = useNavigate();

  return (
    <ul className="issues-list">
      {issues.map((issue) => (
        <li key={issue.id} className="issue">
          <h3 className="issue-title">{issue.title}</h3>
          <p className="issue-description">{issue.body}</p>
          <button
            className="issue-open-comment"
            onClick={() => {
              navigate("/comments", {
                state: issue,
              });
            }}
          >
            Open issue
          </button>
        </li>
      ))}
    </ul>
  );
};

const ListIssue = () => {
  const [isLoading, setLoading] = useState(false);
  const [issues, setIssues] = useState<any[]>([]);
  const { token } = useGithub();
  useEffect(() => {
    (async () => {
      if (token?.access_token) {
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
      {/* {issues.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })} */}
      <GithubIssuesList issues={issues} />
    </div>
  );
};

export default ListIssue;
