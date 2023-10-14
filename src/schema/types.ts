import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import ConversationType from "./conversation";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString }, // TODO might need to handle dates differently
    sex: { type: GraphQLString },
    // ... other fields
    likedUsers: { type: new GraphQLList(GraphQLID) },
    dislikedUsers: { type: new GraphQLList(GraphQLID) },
    conversations: { type: new GraphQLList(ConversationType) }, // Conversations associated with the user
  },
});

export default UserType;
