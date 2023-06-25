// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { GITHUB_ACCESS_TOKEN_URL } from "@/lib/config";
import corsHandler from "@/utils/cors";
type Data = {
  message?: string;
  info?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await corsHandler(req, res);
  const code = req?.query?.code;
  if (!code) {
    return res
      .status(400)
      .json({ message: "Bad Request", info: "No code provided" });
  }
  try {
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
    const base64 = Buffer.from(JSON.stringify(response.data)).toString(
      "base64"
    );
    return res.redirect("/github/callback?data=" + base64);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", info: error?.message });
  }
  //   return res
  //     .status(500)
  //     .json({ message: "Internal Server Error", info: "Not implemented" });
};

export default handler;
