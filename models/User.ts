import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IMatch {
  matchId: mongoose.Types.ObjectId;
  roomId: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  preferences: {
    location: {
      coordinates: [number, number];
      maxDistance: number;
    };
  };
  matches: IMatch[];
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  preferences: {
    location: {
      coordinates: {
        type: [Number],
        required: [true, "Location coordinates are required"],
      },
      maxDistance: {
        type: Number,
        required: [true, "Max distance is required"],
      },
    },
  },
  matches: [
    {
      matchId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      roomId: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hashing the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model<IUser>("User", userSchema);
