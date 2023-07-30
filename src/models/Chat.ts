import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface IChat extends Document {
  title: string
  date: any
  content: string
  id: string
  role: string
}

const ChatSchema: Schema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  content: {
    type: String
  },
  id: {
    type: String
  },
  role: {
    type: String
  }
})

export const Chat = (mongoose.models.Chat ||
  model('Chat', ChatSchema)) as Model<IChat>