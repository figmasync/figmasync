import type { NextApiRequest, NextApiResponse } from "next";

class S3Client {
  S3_ACCESS_KEY_ID: string | undefined;
  S3_ACCESS_KEY: string | undefined;
  S3_REGION: string | undefined;
  S3_BUCKET: string | undefined;
  S3_ENDPOINT: string | undefined;
  
  constructor() {
    this.S3_ACCESS_KEY_ID = process?.env?.S3_ACCESS_KEY_ID;
    this.S3_ACCESS_KEY_ID = process?.env?.S3_ACCESS_KEY;
    this.S3_REGION = process?.env?.S3_REGION;
    this.S3_BUCKET = process?.env?.S3_BUCKET;
    this.S3_ENDPOINT = process?.env?.S3_ENDPOINT;
  }
}

export default S3Client;
