import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});

export interface User extends mongoose.Document {
  username: string;
  password: string;
  refreshToken: string;
}
