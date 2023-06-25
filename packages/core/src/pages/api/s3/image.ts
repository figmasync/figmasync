// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import corsHandler from "@/utils/cors";


const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await corsHandler(req, res);
  res.status(200).json({ Health: "ok!" });
};


export default handler;
