import { useEffect, useState } from "react";

const useCapture = () => {
  const [blobUrls,setBlobUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const capture = () => {
    parent.postMessage({ pluginMessage: { type: "capture-nodes" } }, "*");
    setIsLoading(true);
  };

  function typedArrayToBuffer(array) {
    return array.buffer.slice(
      array.byteOffset,
      array.byteLength + array.byteOffset
    );
  }

  function exportTypeToBlobType(type: string) {
    switch (type) {
      case "PDF":
        return "application/pdf";
      case "SVG":
        return "image/svg+xml";
      case "PNG":
        return "image/png";
      case "JPG":
        return "image/jpeg";
      default:
        return "image/png";
    }
  }

  function exportTypeToFileExtension(type: string) {
    switch (type) {
      case "PDF":
        return ".pdf";
      case "SVG":
        return ".svg";
      case "PNG":
        return ".png";
      case "JPG":
        return ".jpg";
      default:
        return ".png";
    }
  }

  useEffect(() => {
    window.onmessage = (event: any) => {
      try {
        const blobUrls = [];
        if (event?.data?.pluginMessage?.type === "capture-nodes-success") {
          const { exportableBytes } = event?.data?.pluginMessage;
          if (exportableBytes) {
            for (let data of exportableBytes) {
              const { bytes, name, setting } = data;
              const cleanBytes = typedArrayToBuffer(bytes);
              const type = exportTypeToBlobType(setting.format);
              const extension = exportTypeToFileExtension(setting.format);
              let blob = new Blob([cleanBytes], { type });
              const fileName = `${name}${setting.suffix}${extension}`;
              const blobURL = window.URL.createObjectURL(blob);
              console.log(fileName, blobURL, "xxxxx");
              blobUrls.push(blobURL);
            }
          }
        }
        setBlobUrls(blobUrls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);
  return { blobUrls, capture, isLoading };
};

export { useCapture };
