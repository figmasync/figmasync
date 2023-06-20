import React, { useEffect, useState } from "react";
import withHeader from "../hoc/header";
import { useCapture } from "../hooks/capture";

const CommentPreview = ({ issue ,token}: { issue: Issue,token: any }) => {
  const [preview, setPreview] = useState(undefined);
  const [isLoading,setLoading] = useState(false);
  const { capture, isLoading: isLoadingCaptureEvent, blobUrls } = useCapture();
  const onClickShowPreview = () => {
    capture();
  };
  const commentOnIssue = ()=>{
    setLoading(true);
    console.log(issue,token)
    setLoading(false);
  }
  useEffect(() => {
    if (blobUrls && blobUrls[0]) {
      setPreview(blobUrls[0]);
    }
  }, [blobUrls]);
  return (
    <div>
      <button
        onClick={() => {
          onClickShowPreview();
        }}
        disabled={isLoadingCaptureEvent}
      >
        {isLoadingCaptureEvent ? 'Loading ....' : 'Open Preview'}
      </button>
      <button
        onClick={() => {
          commentOnIssue()
        }}
        disabled={isLoadingCaptureEvent || isLoading}
      >
        Post on comment
      </button>
      {!isLoadingCaptureEvent && preview && (<img src={preview} alt="screenshot"/>)}
    </div>
  );
};

export default withHeader(CommentPreview);
