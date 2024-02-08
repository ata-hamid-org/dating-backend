// models/Question.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IQuestion extends Document {
  text: string;
}

const questionSchema = new Schema<IQuestion>({
  text: {
    type: String,
    required: [true, "Question text is required"],
  },
});

export default mongoose.model<IQuestion>("Question", questionSchema);
