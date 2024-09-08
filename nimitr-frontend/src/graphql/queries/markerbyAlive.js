import gql from 'graphql-tag'

export default gql`
  query ( $status: EnumMarkerMarkerStatus) {
    markers(filter: { markerStatus: $status }) {
    _id
    markerPattern
    markerStatus
    markerType
    markerUrl
    markerNo
    name
    }
  }
`
