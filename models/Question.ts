import mongoose, { Document, Schema } from "mongoose";

export interface IQuestion extends Document {
  text: string;
  category: string;
  options: string[];
}

const questionSchema = new Schema<IQuestion>(
  {
    text: {
      type: String,
      required: [true, "Question text is required"],
      unique: true, // Ensuring question uniqueness
    },
    category: {
      type: String,
      required: [true, "Question category is required"],
      enum: ["Category1", "Category2", "Category3"], // Example categories
    },
    options: {
      type: [String],
      validate: [arrayLimit, "{PATH} must have at least 2 options"], // Custom validator for options
      default: [],
    },
  },
  { timestamps: true }
); // Adding timestamps

// Custom validator function for options array
function arrayLimit(val) {
  return val.length >= 2;
}

export default mongoose.model<IQuestion>("Question", questionSchema);
