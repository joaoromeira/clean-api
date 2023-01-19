import { model, Schema, Types } from 'mongoose';

export interface AuthTokenInterface {
  token: string;
  expires: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId;
}

export const AuthTokenModel = model(
  'AuthToken',
  new Schema<AuthTokenInterface>({
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date().getTime(),
    },
    updatedAt: {
      type: Date,
      default: new Date().getTime(),
    },
    /**
     * Relations
     */
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  })
);
