import { gql } from '@apollo/client'

export default gql`
query ($project: MongoID, $statuscontent: EnumContentContentStatus,$statusmarker: EnumMarkerMarkerStatus) {
    markers(filter: { markerStatus: $statusmarker }) {
        _id
        markerPattern
        markerStatus
        markerType
        markerUrl
        markerNo
        name
        }
        contents(filter: { project: $project, contentStatus: $statuscontent }) {
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
          }
          contentStatus
        }
    
  }
`
