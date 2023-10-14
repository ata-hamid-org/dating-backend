import mongoose from "../db";

interface DatingPreferences {
  ageRange: {
    min: number;
    max: number;
  };
  distance: number;
  sex: "male" | "female";
  relationshipGoal: string;
  relationshipType: string;
  children: string;
  sexualOrientation: string;
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
  conversations: mongoose.Types.ObjectId[];
  profile: {
    location: {
      coordinates: [number, number]; // latitude and longitude
      city: string;
      country: string;
    };
    languages: string[];
    children: string;
    pets: string;
    smoking: string;
    drinking: string;
    weeds: string;
    drugs: string;
    diet: string;
    job: string;
    education: string;
    sexualOrientation: string;
  };
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
    relationshipGoal: {
      type: String,
      enum: [
        "long-term",
        "short-term",
        "life-partner",
        "friends",
        "unsure",
        "short-term-fun",
      ],
    },
    relationshipType: {
      type: String,
      enum: [
        "monogamy",
        "non-monogamy",
        "open-relationship",
        "polyamory",
        "open-to-exploring",
      ],
    },
    children: {
      type: String,
      enum: [
        "have-want-more",
        "dont-want",
        "dont-have-open-to-have",
        "dont-have-dont-want",
      ],
    },
    sexualOrientation: String,
  },
  photo: String,
  description: String,
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  conversations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  ],
  profile: {
    location: {
      coordinates: { type: [Number], default: [0, 0] },
      city: String,
      country: String,
    },
    languages: { type: [String], default: [] },
    children: String,
    pets: String,
    smoking: String,
    drinking: String,
    weeds: String,
    drugs: String,
    diet: String,
    job: String,
    education: String,
    sexualOrientation: String,
  },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
