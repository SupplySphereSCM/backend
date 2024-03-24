import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum ROLES {
  OWNER = 'OWNER',
  PRODUCER = 'PRODUCER',
  MANUFACTURER = 'MANUFACTURER',
  WHOLESELLER = 'WHOLESELLER',
  RETAILER = 'RETAILER',
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
    flattenMaps: true,
  },
  toObject: {
    virtuals: true,
    getters: true,
    flattenMaps: true,
  },
})
export class User {
  // @Prop()
  // firstName: string;

  // @Prop()
  // lastName: string;

  // @Prop()
  // googleId: string;

  // @Prop()
  // profilePictureUrl: string;

  @Prop()
  email: string;

  // @Prop({
  //   default: false,
  // })
  // isEmailVerified: boolean;

  @Prop()
  password?: string;

  // @Prop()
  // eth_address: string;

  // @Prop({
  //   type: [{ type: String, enum: ROLES }],
  //   required: true,
  // })
  // role: ROLES[];
}

export const UserSchema = SchemaFactory.createForClass(User);
