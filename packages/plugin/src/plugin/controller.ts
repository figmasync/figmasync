import { Buffer } from "buffer";
figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  if (msg?.type === "save-github-token") {
    const token = msg?.token;
    //  base64 decode token
    try {
      let data = Buffer.from(token, "base64").toString("ascii");
      JSON.parse(data);
      await figma.clientStorage.setAsync("github-token", data);
      figma.ui.postMessage({
        type: "save-github-token-success",
      });
      figma.notify("Token saved successfully");
    } catch (error) {
      console.error(error);
      figma.ui.postMessage({
        type: "save-github-token-error",
      });
      figma.notify("Invalid token. Please login again.");
    }
  }
  if (msg?.type === "get-github-token") {
    const token = await figma.clientStorage.getAsync("github-token");
    figma.ui.postMessage({
      type: "get-github-token-success",
      token: token,
    });
  }
  if (msg?.type === "close-plugin") {
    figma.closePlugin();
  }
};
