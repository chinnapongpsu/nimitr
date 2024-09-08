import gql from 'graphql-tag'

export default gql`
  query Contents($filter: FilterFindManyContentInput) {
    contents(filter: $filter) {
      _id
      name
      scale
      rotationX
      rotationY
      rotationZ
      marker{
        _id
        project{
          _id
          name
          type
        }
        name
        type
        markerStatus
        markerType
        markerPattern
        markerUrl
        markerNo
      }
      media {
        _id
        project {
          _id
          name
        }
        type
        mediaUrl
        name
        still
      }
      contentStatus
      nowuse
    }
  }
`
