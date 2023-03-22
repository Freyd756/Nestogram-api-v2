import * as mongoose from 'mongoose';
export const roomSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: false,
  },
  password: {
    required: false,
    type: String,
    unique: false,
  },
  createdAt: {
    required: false,
    type: Number,
    unique: false,
  },
  createrId: {
    required: false,
    type: String,
    unique: false,
  },
  isProtected: {
    required: false,
    type: Boolean,
    unique: false,
  },
  members: {
    required: false,
    type: [
      {
        name: String,
        userId: String,
        logo: String,
      },
    ],
    _id: false,
    unique: false,
  },
});
export type Room = {
  name: string;
  password: string;
  createdAt: number;
  isProtected: boolean;
  createrId: string;
  members: { name: string; userId: string; logo: string }[];
};

export interface IRoom extends mongoose.Document, Room {}
