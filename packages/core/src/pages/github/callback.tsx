import { useRouter } from "next/router";
import { useState } from "react";

const Callback = () => {
  const router = useRouter();
  const { data } = router.query;
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(typeof data === "string" ? data : "");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-2 items-center text-gray-700 bg-white rounded-lg p-4 border border-gray-400">
      <pre className="text-sm">
        <code>{data}</code>
      </pre>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={handleClick}
      >
        {isCopied ? "Copied!" : "Copy to clipboard"}
      </button>
    </div>
  );
};

export default Callback;
