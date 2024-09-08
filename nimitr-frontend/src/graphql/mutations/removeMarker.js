import gql from 'graphql-tag'

export default gql`
mutation (
    $_id: MongoID!
    $status: EnumMarkerMarkerStatus
    ){
    updateMarker(_id:$_id,
    record:{ 
        markerStatus: $status,
    })
    {
        recordId
    }
}
`
