import path from 'path';
import fs from 'fs';
import mime from 'mime';
import { S3 } from 'aws-sdk';

import { configS3, BUCKET_NAME } from '@infrastructure/s3/config-s3';

export const saveFile = async (filename: string): Promise<void> => {
  const originalPath = path.resolve(configS3.directory, filename);

  const ContentType = mime.getType(originalPath);

  if (!ContentType) {
    throw new Error('File not found');
  }

  const fileContent = await fs.promises.readFile(originalPath);

  const s3 = new S3({
    region: 'us-east-1',
  });

  // Save object on aws
  await s3
    .putObject({
      Bucket: BUCKET_NAME,
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    })
    .promise();

  // Delete file
  await fs.promises.unlink(originalPath);
};
