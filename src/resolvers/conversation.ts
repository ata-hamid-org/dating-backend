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
        const conversation = new Conversation({
          participants: args.participants,
        });
        await conversation.save();

        // Add conversation ID to users' conversations list
        await User.updateMany(
          { _id: { $in: args.participants } },
          { $push: { conversations: conversation._id } }
        );

        return conversation;
      } catch (error) {
        throw new Error(`Error creating conversation: ${error.message}`);
      }
    },
  },
};

export default conversationResolvers;
