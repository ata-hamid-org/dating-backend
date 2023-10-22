import mongoose, { Schema, Document } from "mongoose";

export interface ConversationDocument extends Document {
  participants: mongoose.Types.ObjectId[];
  messages: string[];
}

const conversationSchema: Schema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: String, default: [] }],
});

const Conversation = mongoose.model<ConversationDocument>(
  "Conversation",
  conversationSchema
);

export default Conversation;
