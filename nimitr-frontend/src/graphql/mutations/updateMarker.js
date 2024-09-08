import gql from 'graphql-tag'

export default gql`
mutation ( $id: MongoID!, $name: String!, $markerUrl: String ){
    updateMarker(_id: $id,record: {
            name: $name,
            markerUrl: $markerUrl,
        }) {
        recordId
    }
}
`
