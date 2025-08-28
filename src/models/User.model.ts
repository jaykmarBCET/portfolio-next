// models/User.ts
import mongoose, { Schema, model, Document, Model } from 'mongoose';

// Interface and Schema remain the same
interface User extends Document {
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt?: Date;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatarUrl: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
},{timestamps:true});

// Use a conditional check to see if the model already exists
const UserModel: Model<User> = mongoose.models.User || model<User>('User', UserSchema);

export default UserModel;