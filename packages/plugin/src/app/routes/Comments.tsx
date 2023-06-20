import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGithub } from "../hooks/github";

import MarkdownViewer from "../components/MarkdownViewer";
import withHeader from "../hoc/header";
import "../css/comments.css";

const InfoSection = ({ issue, token }: { issue: Issue; token: any }) => {
  const navigate = useNavigate();

  return (
    <div className="info-section">
      {/* <h2>Comment Information</h2> */}
      <div className="info-content">
        <div className="assignee">
          <img src={issue?.assignee?.avatar_url} alt="avatar" />
          <p>Assignee: {issue?.assignee?.login}</p>
        </div>
        <p>Status: {issue?.state?.toUpperCase()}</p>
        <div className="labels-section">
          <h3>Labels:</h3>
          <ul className="labels-list">
            {issue?.labels?.map((label: any) => {
              return (
                <li key={label?.id} className="label">
                  {label.name}
                </li>
              );
            })}
          </ul>
        </div>
        <p>
          <button
            onClick={() => {
              navigate("/preview", {
                state: {
                  issue,
                  token
                },
              });
            }}
          >
            Comment on issue
          </button>
        </p>
        {/* additional information */}
      </div>
    </div>
  );
};
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { token } = useGithub();
  const location = useLocation();
  const fetchComments = async (commentUrl) => {
    setLoading(true);
    try {
      const response = await axios.get(commentUrl, {
        headers: {
          Authorization: `${token?.token_type} ${token.access_token}`,
        },
      });
      setComments(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (location?.state && token?.access_token) {
      fetchComments(location?.state?.comments_url);
    }
  }, [location?.state, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="comments-container">
        <div className="comments-section">
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="comment-author">{comment?.user?.login}</div>
                  <div className="comment-date">{comment.created_at}</div>
                </div>
                <div className="comment-body">
                  {comment?.body && (
                    <div>
                      <MarkdownViewer>{comment?.body}</MarkdownViewer>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <InfoSection issue={location?.state} token={token} />
      </div>
    </div>
  );
};
export default withHeader(Comments);
