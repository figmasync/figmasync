import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD","OPTION"],
});

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
)=> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const corsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
)=> {
  // Run the middleware
  await runMiddleware(req, res, cors);
}

export default corsHandler