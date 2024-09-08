import gql from 'graphql-tag'

export default gql`
  mutation (
    $project: MongoID!
    $name: String!
    $content: MongoID
    $type: EnumMediaType
    $mediaUrl: String
    $soundURL: String
    $still: Boolean
  ) {
    createMedia(
      record: {
        project: $project
        content: $content
        name: $name
        type: $type
        mediaUrl: $mediaUrl
        soundURL: $soundURL
        still: $still
      }
    ) {
      recordId
    }
  }
`
