import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

async function testGCSConnection() {
  const endpoint = process.env.AWS_S3_ENDPOINT;
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  console.log("Testing GCS (S3-compatible API) connection...");
  console.log("Endpoint:", endpoint);
  console.log("Bucket:", bucketName);
  console.log("Access Key ID:", process.env.AWS_ACCESS_KEY_ID);
  
  const client = new S3Client({
    region: process.env.AWS_REGION || 'auto',
    ...(endpoint && { endpoint }),
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  try {
    // ListObjectsV2 is supported by GCS S3-compatible API (unlike ListBuckets)
    const data = await client.send(new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 5,
    }));
    console.log("✅ Success! Connected to GCS bucket:", bucketName);
    if (data.Contents && data.Contents.length > 0) {
      console.log("Objects found:", data.Contents.map(o => o.Key));
    } else {
      console.log("Bucket is empty (but connection works!)");
    }
  } catch (error) {
    console.error("❌ Connection Error:", error.message);
  }
}

testGCSConnection();
