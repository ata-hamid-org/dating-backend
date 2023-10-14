import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from "graphql";

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
  },
});

export default UserType;
