import * as mongoose from 'mongoose';
export const messageSchema: mongoose.Schema = new mongoose.Schema({
  text: {
    required: true,
    type: String,
    unique: false,
  },
  userId: {
    required: true,
    type: String,
    unique: false,
  },
  userName: {
    required: true,
    type: String,
    unique: false,
  },
  type: {
    required: true,
    type: String,
    unique: false,
  },
  roomId: {
    required: true,
    type: String,
    unique: false,
  },
});
export type Message = {
  text: string;
  userId: number;
  userName: string;
  type: string;
  roomId: string;
};

export interface IMessage extends mongoose.Document, Message {}
