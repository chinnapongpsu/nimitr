import gql from 'graphql-tag'

export default gql`
  mutation (
    $name: String!
    $markerPattern: String
    $markerUrl: String
    $markerType: EnumMarkerMarkerType
    $markerNo: String
  ) {
    createMarker(
      record: {
        name: $name
        markerUrl: $markerUrl
        markerPattern: $markerPattern
        markerType: $markerType
        markerNo: $markerNo
      }
    ) {
      recordId
    }
  }
`
