import gql from 'graphql-tag'

export default gql`
mutation Mutation($id: MongoID!, $record: UpdateByIdProjectInput!) {
  updateProject(_id: $id, record: $record) {
    record {
      _id
    }
  }
}
`
