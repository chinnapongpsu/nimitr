import gql from 'graphql-tag'

export default gql`
mutation (
    $_id: MongoID!
    $status: EnumContentContentStatus
    ){
    updateContent(_id:$_id,
    record:{
        contentStatus: $status,
    })
    {
        recordId
    }
}
`
