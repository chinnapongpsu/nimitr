import gql from 'graphql-tag'

export default gql`
  mutation (
    $id: MongoID!
    $name: String!
    $mediaUrl: String
    $soundURL: String
    $still: Boolean
  ) {
    updateMedia(
      _id: $id
      record: {
        name: $name
        mediaUrl: $mediaUrl
        soundURL: $soundURL
        still: $still
      }
    ) {
      recordId
    }
  }
`
