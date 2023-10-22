import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} from "graphql";
import { UserQuery, UserMutation } from "./user";
import ConversationType from "./conversation";
import Conversation from "../models/Conversation";
import conversationResolvers from "../resolvers/conversation";

const ConversationQuery = new GraphQLObjectType({
  name: "ConversationQuery",
  fields: {
    getConversations: {
      type: new GraphQLList(ConversationType),
      args: { userId: { type: GraphQLID } },
      resolve(parent, args) {
        const { userId } = args;
        // Fetch conversations where the given user ID is one of the participants
        return Conversation.find({ participants: userId });
      },
    },
    // More conversation-related queries can be added here
  },
});

const ConversationMutation = new GraphQLObjectType({
  name: "ConversationMutation",
  fields: {
    createConversation: {
      type: ConversationType,
      args: { participants: { type: new GraphQLList(GraphQLID) } },
      resolve: conversationResolvers.Mutation.createConversation, // Use the resolver from conversationResolvers
    },
    // More conversation-related mutations can be added here
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...UserQuery.fields,
    ...ConversationQuery.fields,
    // More root queries can be added here
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...UserMutation.fields,
    ...ConversationMutation.fields,
    // More mutations can be added here
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
