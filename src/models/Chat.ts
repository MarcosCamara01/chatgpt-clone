import mongoose, { Document, model, Model, Schema } from 'mongoose'

export interface IChat extends Document {
  title: string
  date: string
  content: string
}

const ChatSchema: Schema = new Schema({
  title: {
    type: String
  },
  date: {
    type: String
  },
  content: {
    type: String
  }
})

export const Chat = (mongoose.models.Chat ||
  model('Chat', ChatSchema)) as Model<IChat>