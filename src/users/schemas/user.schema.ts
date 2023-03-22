import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const userSchema: mongoose.Schema = new mongoose.Schema({
  login: {
    required: true,
    type: String,
    unique: true,
    default: ' ',
  },
  name: {
    required: false,
    type: String,
    default: ' ',
  },
  password: {
    required: true,
    unique: false,
    type: String,
    default: ' ',
  },
  avatar: {
    required: false,
    unique: false,
    type: String,
    default: ' ',
  },
  token: {
    required: false,
    type: String,
    default: ' ',
  },
});

export type User = {
  name?: string;
  password: string;
  login: string;
  token: string;
  avatar?: string;
};
export interface IUser extends mongoose.Document, User {
  _id: Types.ObjectId;
}
