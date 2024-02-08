// graphql/schema.ts
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    preferences: UserPreferences
    matches: [Match]
    # ... other fields
  }

  type Match {
    matchId: ID!
    roomId: String!
  }

  type UserPreferences {
    # ... preferences fields
  }

  type Query {
    findMatches: [User]
    # Add queries for retrieving matches or other data
  }

  type Mutation {
    matchUsers(userId1: ID!, userId2: ID!): [User]
    # ... other mutation definitions
  }

  type Subscription {
    newMessage(roomId: ID!): Message
  }
`;

export default typeDefs;
