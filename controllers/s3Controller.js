// import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import dotenv from 'dotenv';
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';

// dotenv.config();

// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
// const AWS_S3_REGION_NAME = process.env.AWS_S3_REGION_NAME;

// const s3Client = new S3Client({
//   region: AWS_S3_REGION_NAME,
//   credentials: {
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY
//   }
// });

// const uploadImage = async (file) => {
//   const fileStream = fs.createReadStream(file.path);
//   const fileKey = uuidv4(); // Unique identifier for the file

//   const uploadParams = {
//     Bucket: AWS_S3_BUCKET_NAME,
//     Key: fileKey,
//     Body: fileStream
//   };

//   try {
//     await s3Client.send(new PutObjectCommand(uploadParams));
//     return fileKey; // Return the file key for storing in the database
//   } catch (err) {
//     console.error('Failed to upload file:', err);
//     throw err;
//   } finally {
//     fs.unlinkSync(file.path); // Clean up the temp file
//   }
// };

// const getImageUrl = async (fileKey, expiration = 3600) => { // Added default expiration value
//   try {
//     const command = new GetObjectCommand({
//       Bucket: AWS_S3_BUCKET_NAME,
//       Key: fileKey
//     });
//     const url = await getSignedUrl(s3Client, command, { expiresIn: expiration });
//     return url; // Return the pre-signed URL
//   } catch (err) {
//     console.error('Failed to get pre-signed URL:', err);
//     throw err;
//   }
// };

// export { uploadImage, getImageUrl };

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_S3_REGION_NAME = process.env.AWS_S3_REGION_NAME;

const s3Client = new S3Client({
  region: AWS_S3_REGION_NAME,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

const uploadImage = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const fileKey = uuidv4(); // Unique identifier for the file

  const uploadParams = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Body: fileStream
    // ACL: 'public-read' // Removed the ACL parameter
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return fileKey; // Return the file key for storing in the database
  } catch (err) {
    console.error('Failed to upload file:', err);
    throw err;
  } finally {
    fs.unlinkSync(file.path); // Clean up the temp file
  }
};

const getImageUrl = (fileKey) => {
  return `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_S3_REGION_NAME}.amazonaws.com/${fileKey}`;
};

export { uploadImage, getImageUrl };

