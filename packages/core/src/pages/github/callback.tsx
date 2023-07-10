import { useRouter } from "next/router";
import { useState } from "react";

const Callback = () => {
  const router = useRouter();
  const { login_status: loginStatus  } = router.query;
  return (
    <div className="flex items-center justify-center h-screen">
      {loginStatus === "success" ? (
        <div className="bg-green-500 text-white font-bold rounded-lg py-4 px-6 shadow-lg">
          Login Successful!. Close the tab and open the plugin
        </div>
      ) : (
        <div className="bg-red-500 text-white font-bold rounded-lg py-4 px-6 shadow-lg">
          Login Failed!
        </div>
      )}
    </div>
  );
};

export default Callback;
