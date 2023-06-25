// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { promisify } from "util";
import S3Client from "@/lib/s3";
import { generateRandomName } from "@/lib/random";
import corsHandler from "@/utils/cors";

const upload = multer();
const uploadMiddleware = promisify(upload.single("file"));

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<any> | any
) {
  try {
    await corsHandler(req, res);
    if (req.method === "POST") {
      await uploadMiddleware(req, res);
      if (!req.file) {
        throw new Error("file not uploaded");
      }
      const file = req.file;
      const s3Client = new S3Client();
      let fileName = generateRandomName() + "_" + file?.originalname;
      // replace whitespace
      fileName = fileName.replace(/\s/g, "");
      const folderPath = "test";
      const uploadResponse = await s3Client.uploadFile({
        fileName: fileName,
        body: file?.buffer,
        contentType: file?.mimetype,
        folderPath,
      });
      let fileUrl = process?.env?.IMAGE_PUBLIC_URL ?? "";
      if (!fileUrl.endsWith("/")) {
        fileUrl += "/";
      }

      fileUrl += folderPath + "/" + fileName; 
      res.status(200).json({ url: fileUrl });
    } else {
      return res.status(405).json({
        message: "Method Not Allowed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
