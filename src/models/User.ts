import mongoose from "../db";

interface DatingPreferences {
  ageRange: {
    min: number;
    max: number;
  };
  distance: number;
  sex: "male" | "female";
}

export interface UserDocument extends mongoose.Document {
  name: string;
  dateOfBirth: Date;
  sex: "male" | "female";
  datingPreferences: DatingPreferences;
  photo?: string;
  description?: string;
  likedUsers: mongoose.Types.ObjectId[];
  dislikedUsers: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  datingPreferences: {
    ageRange: {
      min: Number,
      max: Number,
    },
    distance: Number,
    sex: {
      type: String,
      enum: ["male", "female"],
    },
  },
  photo: String,
  description: String,
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
