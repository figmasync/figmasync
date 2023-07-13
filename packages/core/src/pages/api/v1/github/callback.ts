// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { GITHUB_ACCESS_TOKEN_URL, GITHUB_USER_API } from "@/lib/config";
import corsHandler from "@/utils/cors";
import { updatePolls } from "@/db-controller/poll";
import { getUser, insertUser } from "@/db-controller/user";
import { encryptData } from "@/lib/encrypt";
import sha256 from "sha256";
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

    const userDetails = await axios.get(GITHUB_USER_API, {
      headers: {
        Authorization: `${response?.data?.token_type} ${response?.data?.access_token}`,
      },
    });

    if (response?.data?.error || userDetails?.data?.error) {
      return res.redirect(
        "/github/callback?login_status=failed&message=" +
          response?.data?.error?.message
      );
    }
    /**
     * user
     */
    const { id, login } = userDetails?.data;
    if (id) {
      const uuid = sha256.x2(JSON.stringify({ id, login }));
      const userData = await getUser(uuid);
      if (!userData) {
        await insertUser({
          id: uuid,
          githubUserId: id?.toString(),
        });
      }
    }

    const encryptionKey =
      process?.env?.DB_POLL_ENCRYPTION_KEY || "sample_encryption_key";
    await updatePolls({
      code_challenge: stateData?.code,
      token: {
        data: encryptData(response?.data, encryptionKey),
      },
    });

    return res.redirect("/github/callback?login_status=success");
  } catch (error: any) {
    console.log(error);
    return res.redirect(
      "/github/callback?login_status=failed&message=Internal Server Error"
    );
  }
  //   return res
  //     .status(500)
  //     .json({ message: "Internal Server Error", info: "Not implemented" });
};

export default handler;
