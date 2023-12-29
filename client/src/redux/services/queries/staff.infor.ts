import gql from "graphql-tag";

export const staffInforQuery = gql`
  query GetUsers($userIds: [String!]!) {
    users(uids: $userIds) {
      uid
      name
      role
      phone
      username
      email
    }
  }
`;
