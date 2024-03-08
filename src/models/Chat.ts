import mongoose, { Document, model, Model, Schema } from 'mongoose';

export interface IMessage {
  content: string;
  id: string
  role: string
}

export interface IChat extends Document {
  title: string;
  date: Date;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
});

const ChatSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  messages: {
    type: [MessageSchema],
    required: true,
  },
});

export const Chat = (mongoose.models.Chat || model<IChat>('Chat', ChatSchema)) as Model<IChat>;
