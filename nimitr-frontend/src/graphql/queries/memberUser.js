import gql from 'graphql-tag'

export default gql`
  query ($id: MongoID!) {
    memberUserId(_id: $id) {
      email
      firstname
      lastname
      username
      rank
    }
  }
`
