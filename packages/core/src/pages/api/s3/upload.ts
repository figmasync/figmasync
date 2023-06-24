// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { promisify } from "util";
import { pipeline } from "stream";

const upload = multer();
const uploadMiddleware = promisify(upload.single('file'));

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data> | any
) {
    if(req.method === 'POST'){
        await uploadMiddleware(req, res);
        console.log(req.file)
    }
  res.status(200).json({ name: "John Doe" });
}

export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  