import React, { useEffect, useState } from "react";
import withHeader from "../hoc/header";
import { useCapture } from "../hooks/capture";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import axios from "axios";

const CommentPreview = () => {
  const [preview, setPreview] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const { capture, isLoading: isLoadingCaptureEvent, blobUrls, files } = useCapture();
  const onClickShowPreview = () => {
    capture();
  };
  const commentOnIssue = async () => {
    const { issue, token }: { issue: Issue; token: any } = location?.state;
    const accessToken = token?.access_token;
    const issueCommentUrl = issue?.comments_url;
    console.log(files[0],'xxx');
    
    setLoading(true);
    try {
      const data = new FormData();
      data.append('test','value');
      data.append('file',files[0]);

      const response = await axios.post('http://localhost:3000/api/s3/upload',data,{
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      })
      
      //   const headers = {
      //     Authorization: `Bearer ${accessToken}`,
      //     "Content-Type": "application/vnd.github.v3+json",
      //   };
      //   const commentBody = `![Alt Text](attachment://${preview})`;
      //   const payload = { body: commentBody };
      //   const imageResponse = await axios.post('https://api.github.com/repos/abhisawesome/figma-issue-private/git/blobs', {
      //     content: preview.split('/')[1], // Assuming the Blob URL is in the format "data:image/png;base64,<base64-encoded-data>"
      //     encoding: 'base64'
      //   }, {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`
      //     }
      //   });
      //   const imageSha = imageResponse.data.sha;
        if(response?.data?.url){
          await axios.post(issueCommentUrl, {
            body: `![Alt Text](${response?.data?.url})` // Assuming you want to display the image as an inline image in the comment
          }, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        }
       
      // console.log(imageResponse?.data)
      // const formData = new FormData();
      // formData.append("body", " from api");
      // formData.append("image", preview);
    //   const response = await axios.post(issueCommentUrl, formData, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
      // const response = await fetch(issueCommentUrl,{
      //   method: 'POST',
      //   body: formData,
      //   headers:{
      //       Authorization: `Bearer ${accessToken}`,
      //   }
      // })
      // const respJson = await response?.json();
      // console.log(respJson)
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
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
        {isLoadingCaptureEvent ? "Loading ...." : "Open Preview"}
      </button>
      <button
        onClick={() => {
          commentOnIssue();
        }}
        disabled={isLoadingCaptureEvent || isLoading}
      >
        Post on comment
      </button>
      {!isLoadingCaptureEvent && preview && (
        <img src={preview} alt="screenshot" />
      )}
    </div>
  );
};

export default withHeader(CommentPreview);
