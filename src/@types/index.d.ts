export {};

declare global {
  import { Types } from 'mongoose';

  namespace Express {
    interface Request {
      userId: Types.ObjectId;
      file: any;
    }
  }

  interface Paginate {
    page?: number;
    limit?: number;
  }
}
