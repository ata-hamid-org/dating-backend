import Conversation from "../models/Conversation";
import User from "../models/User";

const conversationResolvers = {
  Query: {
    getConversations: async (parent, args: { userId: string }) => {
      try {
        const user = await User.findById(args.userId).populate("conversations");
        return user?.conversations || [];
      } catch (error) {
        throw new Error(`Error fetching conversations: ${error.message}`);
      }
    },
  },
  Mutation: {
    createConversation: async (parent, args: { participants: string[] }) => {
      try {
        // Check if all specified participants exist
        const existingUsers = await User.find({
          _id: { $in: args.participants },
        });
        if (existingUsers.length !== args.participants.length) {
          throw new Error("Invalid participants specified.");
        }

        // Create a new conversation with specified participants
        const conversation = new Conversation({
          participants: args.participants,
          messages: [], // You can initialize messages array if needed
        });

        // Save the conversation to the database
        await conversation.save();

        // Add conversation ID to users' conversations list
        await User.updateMany(
          { _id: { $in: args.participants } },
          { $push: { conversations: conversation._id } }
        );

        // Return the created conversation
        return conversation;
      } catch (error) {
        throw new Error(`Error creating conversation: ${error.message}`);
      }
    },
  },
};

export default conversationResolvers;
