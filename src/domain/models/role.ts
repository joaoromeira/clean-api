import { model, Schema, Types } from 'mongoose';

export interface RoleInterface {
  name: string;
  isArchived: boolean;
  isOficial: boolean;
  createdAt: Date;
  updatedAt: Date;
  /**
   * Relations
   */
  permissions?: Types.ObjectId;
}

export const RoleModel = model(
  'Role',
  new Schema<RoleInterface>({
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
    /**
     * Relations
     */
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  })
);
