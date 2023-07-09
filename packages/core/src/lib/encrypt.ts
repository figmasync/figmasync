
import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createHash,
} from "crypto";

const algorithm = "aes-256-cbc";
interface EncryptData {
  data: string;
  iv: string;
  originalType: string;
}

const encryptData = (incomingData: any, keys: string): EncryptData => {
  let data = incomingData;
  const originalType = typeof data;
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }
  const keyBuffer = createHash("sha256")
    .update(String(keys))
    .digest("base64")
    .slice(0, 32);
  // const ivBuffer = createHash("sha256")
  //   .update(String(keys))
  //   .digest("base64")
  //   .slice(0, 16);
  const ivBuffer = randomBytes(16);
  let cipher = createCipheriv(algorithm, Buffer.from(keyBuffer), ivBuffer);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    data: encrypted.toString("hex"),
    iv: ivBuffer.toString("hex"),
    originalType,
  };
};

const decryptData = (data: EncryptData, keys: string): string => {
  const keyBuffer = createHash("sha256")
    .update(String(keys))
    .digest("base64")
    .slice(0, 32);
  // const ivBuffer = createHash("sha256")
  //   .update(String(keys))
  //   .digest("base64")
  //   .slice(0, 16);
  let ivBuffer = Buffer.from(data.iv, "hex");
  let encryptedText = Buffer.from(data?.data, "hex");
  let decipher = createDecipheriv(algorithm, Buffer.from(keyBuffer), ivBuffer);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  const decryptedText = decrypted.toString();
  return decryptedText
};

export { encryptData, decryptData };
