import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useGithub } from "../hooks/github";
import MarkdownViewer from "../components/MarkdownViewer";
import "../css/comments.css";
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { token } = useGithub();
  console.log(token);
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
  );
};
export default Comments;
