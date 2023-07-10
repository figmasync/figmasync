// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import corsHandler from "@/utils/cors";
import { v4 as UUID } from "uuid";
import sha256 from "sha256";
import { decryptData } from "@/lib/encrypt";
import {
  getPollsWithCodeVerifier as getPolls,
  insertIntoPoll,
} from "@/db-controller/poll";

// PKCE CONCEPT
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await corsHandler(req, res);
  if (req.method === "POST") {
    const uuid = UUID();
    const codeChallenge = sha256.x2(uuid);
    try {
      await insertIntoPoll({
        code_challenge: codeChallenge,
        code_verifier: uuid,
      });
      return res
        .status(200)
        .json({ code_challenge: codeChallenge, code_verifier: uuid });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        recall_request: true,
      });
    }
  }
  if (req.method === "GET") {
    const { code_verifier } = req?.query;
    if (!code_verifier || typeof code_verifier !== "string") {
      return res.status(400).json({
        message: "Bad request",
      });
    }
    const currentPoll: any = await getPolls({
      code_verifier: code_verifier?.trim(),
    });
    const codeChallenge = sha256.x2(code_verifier);
    if (!currentPoll || codeChallenge !== currentPoll?.code_challenge) {
      return res.status(401).json({
        message: "code not verified",
      });
    }
    const encryptionKey =
      process?.env?.DB_POLL_ENCRYPTION_KEY || "sample_encryption_key";
    let decryptDataDetails;
    try {
      if (!currentPoll?.token?.data) {
        return res.status(200).json({});
      }
      decryptDataDetails = JSON.parse(
        decryptData(currentPoll?.token?.data, encryptionKey) ?? "{}"
      );
    } catch (error) {
      return res.status(401).json({ message: "Decryption failed" });
    }
    return res.status(200).json(decryptDataDetails);
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
