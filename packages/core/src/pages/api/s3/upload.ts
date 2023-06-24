// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { promisify } from "util";
import S3Client from "@/lib/s3";
import { generateRandomName } from "@/lib/random";
const upload = multer();
const uploadMiddleware = promisify(upload.single("file"));

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<any> | any
) {
  try {
    if (req.method === "POST") {
      await uploadMiddleware(req, res);
      if (!req.file) {
        throw new Error("file not uploaded");
      }
      const file = req.file;
      const s3Client = new S3Client();
      const fileName = generateRandomName() + "_" + file?.originalname;
      const folderPath = "test";
      const uploadResponse = await s3Client.uploadFile({
        fileName: fileName,
        body: file?.buffer,
        contentType: file?.mimetype,
        folderPath,
      });
      console.log(uploadResponse, "xx");
      let fileUrl = process?.env?.IMAGE_PUBLIC_URL ?? "";
      if (!fileUrl.endsWith("/")) {
        fileUrl += "/";
      }

      fileUrl += folderPath + "/" + fileName;
      res.status(200).json({ url: fileUrl });
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
