import { Document, Schema } from 'mongoose';

export const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
  },
  { timestamps: true },
);

export interface Post extends Document {
  title: string;
  content: string;
}

// export type PostDocument = Post & Document;
//
// @Schema()
// export class Post {
//   @Prop()
//   title: string;
//
//   @Prop()
//   content: string;
// }
//
// export const PostSchema = SchemaFactory.createForClass(Post);
