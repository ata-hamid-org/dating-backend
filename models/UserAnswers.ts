// models/UserAnswers.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IUserAnswer extends Document {
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  answer: string;
}

const userAnswersSchema = new Schema<IUserAnswer>({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "User ID is required"],
  },
  questionId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Question ID is required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
});

export default mongoose.model<IUserAnswer>("UserAnswer", userAnswersSchema);
