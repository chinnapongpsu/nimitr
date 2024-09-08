import gql from 'graphql-tag'

export default gql`
mutation ( $id: MongoID!, $name: String!, ){
    updateProject(_id: $id,record: {
            name: $name,
        }) {
        recordId
    }
}
`
