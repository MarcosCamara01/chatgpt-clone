import { Schema, model, models } from "mongoose";

export interface UserDocument {
  apiKey: string;
  userId: string;
}

const UserSchema = new Schema<UserDocument>({
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

const User = models.User || model<UserDocument>('User', UserSchema);
export default User;