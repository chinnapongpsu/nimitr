import gql from 'graphql-tag'

export default gql`
mutation (  $id: MongoID!, $name: String! ,$scale: Float, $rotationX: Float, $rotationY: Float, $rotationZ: Float ){
    updateContent(_id: $id, record: {
            name: $name,
            scale: $scale,
            rotationX: $rotationX ,
            rotationY:$rotationY ,
            rotationZ:$rotationZ,
        }) {
        recordId
    }
}
`
