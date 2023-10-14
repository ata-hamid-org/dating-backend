import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";

const ConversationType = new GraphQLObjectType({
  name: "Conversation",
  fields: {
    id: { type: GraphQLID },
    participants: { type: new GraphQLList(GraphQLID) }, // IDs of users participating in the conversation
    messages: { type: new GraphQLList(GraphQLString) }, // Messages in the conversation
  },
});

export default ConversationType;
