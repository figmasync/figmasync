import React, { useEffect, useState } from "react";
import withHeader from "../hoc/header";
import { useCapture } from "../hooks/capture";

const CommentPreview = () => {
  const [preview, setPreview] = useState(undefined);
  const { capture, isLoading: isLoadingCaptureEvent, blobUrls } = useCapture();
  const onClickShowPreview = () => {
    capture();
  };
  useEffect(() => {
    console.log(isLoadingCaptureEvent, "xxxx");
  }, [isLoadingCaptureEvent]);
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
      {!isLoadingCaptureEvent && preview && (<img src={preview} alt="screenshot"/>)}
    </div>
  );
};

export default withHeader(CommentPreview);
