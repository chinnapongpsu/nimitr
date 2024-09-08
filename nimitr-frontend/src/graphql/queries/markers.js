import gql from 'graphql-tag'

export default gql`
  query {
    markers {
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
