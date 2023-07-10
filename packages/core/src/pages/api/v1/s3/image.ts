// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import corsHandler from "@/utils/cors";
import axios from "axios";

const handler = async (req: NextApiRequest , res: NextApiResponse<any> ) => {
  await corsHandler(req, res);
  if (req.method === "GET") {
    const response = await axios.get(
      `${process?.env?.IMAGE_PUBLIC_URL}/test/${req.query?.fileName}`,
      {
        responseType: "arraybuffer",
      }
    );
    res.setHeader('Content-Type',"image/png")
    return res.status(200).send(response.data);
  }
};

export default handler;
