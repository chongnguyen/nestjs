import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    refreshToken: String,
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
  refreshToken: string;
}
