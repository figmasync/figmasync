// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { GITHUB_ACCESS_TOKEN_URL } from "@/lib/config";
import corsHandler from "@/utils/cors";
import { updatePolls } from "@/db-controller/poll";
import { encryptData } from "@/lib/encrypt";
type Data = {
  message?: string;
  info?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) => {
  await corsHandler(req, res);
  const { code, state } = req?.query;

  if (!code || !state || typeof state !== "string") {
    return res
      .status(400)
      .json({ message: "Bad Request", info: "No code provided" });
  }
  try {
    const stateData: { code: string } = JSON.parse(
      Buffer.from(state, "base64").toString("utf-8")
    );
    const response = await axios.post(
      GITHUB_ACCESS_TOKEN_URL,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (response?.data?.error) {
      console.log(response?.data);
      return res.redirect(
        "/github/callback?login_status=failed&message=" +
          response?.data?.error?.message
      );
    }
    const encryptionKey =
      process?.env?.DB_POLL_ENCRYPTION_KEY || "sample_encryption_key";
    await updatePolls({
      code_challenge: stateData?.code,
      token: {
        token: encryptData(response?.data?.token, encryptionKey),
        scope: encryptData(response?.data?.scope, encryptionKey),
        token_type: encryptData(response?.data?.token_type, encryptionKey),
      },
    });
   
    return res.redirect("/github/callback?login_status=success");
  } catch (error: any) {
    console.log(error)
    return res.redirect(
      "/github/callback?login_status=failed&message=Internal Server Error"
    );
  }
  //   return res
  //     .status(500)
  //     .json({ message: "Internal Server Error", info: "Not implemented" });
};

export default handler;
