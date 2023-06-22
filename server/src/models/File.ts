import { Document, Schema, model } from "mongoose";

export interface IFile extends Document {
  file: string;
}

const FileSchema: Schema = new Schema(
  {
    file: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default model<IFile>("File", FileSchema);
