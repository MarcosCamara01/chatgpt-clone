import { model, models, Schema } from 'mongoose';

export interface IMessage {
  content: string;
  id: string;
  createdAt: Date;
  role: string;
}

export interface IChat {
  title: string;
  date: Date;
  messages: IMessage[];
  _id: Schema.Types.ObjectId;
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

const ChatSchema: Schema = new Schema<IChat>({
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

export const Chat = (models && models.Chat || model('Chat', ChatSchema));
