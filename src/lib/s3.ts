import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION || 'auto';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
const endpoint = process.env.AWS_S3_ENDPOINT || undefined;

export const s3Client = new S3Client({
  region,
  ...(endpoint && { endpoint }),
  forcePathStyle: true, // Required for GCS S3-compatible API
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
