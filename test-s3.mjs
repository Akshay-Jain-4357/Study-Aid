import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

async function testS3() {
  console.log("Testing S3 with Region:", process.env.AWS_REGION);
  console.log("Access Key ID:", process.env.AWS_ACCESS_KEY_ID);
  
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  try {
    const data = await client.send(new ListBucketsCommand({}));
    console.log("✅ Success! Connected to AWS.");
    console.log("Buckets:", data.Buckets.map(b => b.Name));
  } catch (error) {
    console.error("❌ AWS Error:", error.message);
  }
}

testS3();
