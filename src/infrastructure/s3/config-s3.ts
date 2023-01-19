import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp');

export const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export const configS3 = {
  directory: tmpFolder,
  ACL: 'private',
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const filename = `${new Date().getTime()}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
