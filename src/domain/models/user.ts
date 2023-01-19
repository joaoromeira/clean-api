import { model, Schema, Types } from 'mongoose';

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  isConfirmed: boolean;
  isArchived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  address?: Types.ObjectId;
  role?: Types.ObjectId;
}

export const UserModel = model(
  'User',
  new Schema<UserInterface>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: { unique: true },
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
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
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  })
);
