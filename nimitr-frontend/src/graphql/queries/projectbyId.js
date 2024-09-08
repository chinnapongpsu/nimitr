import gql from 'graphql-tag'

export default gql`
  query ($id: MongoID!) {
    projectId(_id: $id) {
      _id
      name
      type
      projectStatus
    }
  }
`
