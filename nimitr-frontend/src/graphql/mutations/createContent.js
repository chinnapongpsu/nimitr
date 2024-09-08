import gql from 'graphql-tag'

export default gql`
mutation ( $project: MongoID!, $name: String! $marker: MongoID, $media: MongoID ,$scale: Float, $rotationX: Float, $rotationY: Float, $rotationZ: Float){
    createContent(record: {
            project: $project,
            name: $name,
            marker: $marker,
            media: $media,
            scale: $scale,
            rotationX: $rotationX ,
            rotationY:$rotationY ,
            rotationZ:$rotationZ,
        }) {
        recordId
    }
}
`
