import mongoose, { Document, Schema } from "mongoose";

interface IMatch {
  matchId: mongoose.Types.ObjectId;
  roomId: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  preferences: {
    location: {
      coordinates: [number, number]; // GPS coordinates
      maxDistance: number; // Max distance filter (in kilometers or miles)
    };
    // ... other preferences
  };
  matches: IMatch[];
  // ... other fields
}

const userSchema = new Schema<IUser>({
  email: {
    // ... email field definition
  },
  password: {
    // ... password field definition
  },
  preferences: {
    location: {
      coordinates: {
        type: [Number],
        required: true,
      },
      maxDistance: {
        type: Number,
        required: true,
      },
    },
    // ... other preferences field definitions
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
  // ... other schema fields
});

// ... rest of the User schema definition

export default mongoose.model<IUser>("User", userSchema);
