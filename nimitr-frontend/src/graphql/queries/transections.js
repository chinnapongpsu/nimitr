import gql from 'graphql-tag'

export default gql`
  query ($memberId: MongoID) {
    transections(filter: { memberId: $memberId }) {
      _id
      memberId
      amount
      status
      token
      type
      createdAt
      updatedAt
      description
      user {
        ... on Member {
          _id
          username
          rank
          userExpirationTime
        }
      }
    }
  }
`
