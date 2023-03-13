import React from "react";
import Markdown from "markdown-to-jsx";

const MarkdownViewer = ({ markdown, children }:any) => {
  return (
    <div>
      <Markdown>{children ?? markdown}</Markdown>
    </div>
  );
};

export default MarkdownViewer;
