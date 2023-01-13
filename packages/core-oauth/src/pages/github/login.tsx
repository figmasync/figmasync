import Image from "next/image";
import { GITHUB_LOGIN_URL } from "@/lib/config";
const GithubLogin = ({ loginUrl, clientId }: GithubLoginProps) => {
    console.log(loginUrl, clientId)
  return (
    <div className="flex flex-col items-center px-4 justify-center h-full space-y-4">
       <button className="flex flex-row items-center" onClick={()=>{
        window.location.href = loginUrl + "&client_id=" + clientId;
      }}>
        <span className="mx-2">Login</span>
        <Image
          src="/github_logo.png"
          alt="github logo"
          width={30}
          height={30}
        />
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
