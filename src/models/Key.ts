import { Schema, model, models } from "mongoose";

export interface KeyDocument {
  userKey: string;
  userId: string | Schema.Types.ObjectId;
}

const KeySchema = new Schema<KeyDocument>({
  userId: {
    type: String || Schema.Types.ObjectId,
    unique: true,
  },
  userKey: {
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