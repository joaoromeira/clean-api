import { model, Schema } from 'mongoose';

export interface PermissionInterface {
  name: string;
  isArchived: boolean;
  isOficial: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const PermissionModel = model(
  'Permission',
  new Schema<PermissionInterface>({
    name: {
      type: String,
      required: true,
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
  })
);
