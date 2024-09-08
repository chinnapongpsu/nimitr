import gql from 'graphql-tag'

export default gql`
  mutation (
    $user: MongoID!
    $name: String!
    $type: EnumProjectType
  ) {
    createProject(
      record: { user: $user, name: $name, type: $type }
    ) {
      recordId
    }
  }
`
