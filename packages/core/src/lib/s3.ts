import {
  PutObjectCommand,
  S3Client as sdkS3Client,
  GetObjectCommand,
  PutObjectCommandInput,
  PutObjectRequest,
} from "@aws-sdk/client-s3";

class S3Client {
  private readonly S3_ACCESS_KEY_ID: string | undefined;
  private readonly S3_ACCESS_KEY: string | undefined;
  private readonly S3_REGION: string | undefined;
  private readonly S3_BUCKET: string | undefined;
  private readonly S3_ENDPOINT: string | undefined;
  private client: sdkS3Client;
  constructor() {
    this.S3_ACCESS_KEY_ID = process?.env?.S3_ACCESS_KEY_ID;
    this.S3_ACCESS_KEY_ID = process?.env?.S3_ACCESS_KEY;
    this.S3_REGION = process?.env?.S3_REGION;
    this.S3_BUCKET = process?.env?.S3_BUCKET;
    this.S3_ENDPOINT = process?.env?.S3_ENDPOINT;
    this.client = new sdkS3Client({
      endpoint: process?.env?.S3_ENDPOINT,
      region: "auto",
      credentials: {
        accessKeyId: process?.env?.S3_ACCESS_KEY_ID ?? "",
        secretAccessKey: process?.env?.S3_ACCESS_KEY ?? "",
      },
    });
  }
  async uploadFile(params: {
    folderPath: string;
    fileName: string;
    body: PutObjectRequest["Body"] | string | Uint8Array | Buffer;
    access?: string;
    contentType: string;
    metadata?: Record<string, string>;
  }) {
    const uploadParams: PutObjectCommandInput = {
      Bucket: this.S3_BUCKET,
      Key: params?.folderPath
        ? params?.folderPath + "/" + params?.fileName
        : params?.fileName,
      Body: params?.body,
      ACL: params?.access ?? "private",
      Metadata: params?.metadata,
      ContentType: params?.contentType,
    };
    const data = await this.client.send(new PutObjectCommand(uploadParams));
    return data
  }

}

export default S3Client;
