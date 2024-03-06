import { Schema, model, models } from "mongoose";

export interface KeyDocument {
  apiKey: string;
  userId: string;
}

const KeySchema = new Schema<KeyDocument>({
  userId: {
    type: String,
    unique: true,
  },
  apiKey: {
    type: String,
    required: [true, "API key is required"],
  }
},
  {
    timestamps: true,
  }
);

const Key = models.Key || model<KeyDocument>('Key', KeySchema);
export default Key;