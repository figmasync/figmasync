import Image from "next/image";
import { GITHUB_LOGIN_URL } from "@/lib/config";
import { useRouter } from "next/router";
const GithubLogin = ({ loginUrl, clientId }: GithubLoginProps) => {
  const router = useRouter();
  const { code } = router?.query;
  const stateData = Buffer.from(JSON.stringify({ code })).toString("base64");
  if (!code) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-600 text-white font-bold rounded-lg py-4 px-6 shadow-lg">
          Invalid Request
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <button
        className="flex items-center justify-center bg-white text-black font-bold py-2 px-4 rounded-lg shadow-lg"
        onClick={() => {
          window.location.href =
            loginUrl + "&client_id=" + clientId + "&state=" + stateData;
        }}
      >
        <Image
          className="h-4 w-4 mr-2"
          src="/github_logo.png"
          alt="github logo"
          width={30}
          height={30}
        />
        Sign in with GitHub
      </button>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      loginUrl: GITHUB_LOGIN_URL,
      clientId: process.env.GITHUB_CLIENT_ID,
    }, // will be passed to the page component as props
  };
}

export default GithubLogin;
