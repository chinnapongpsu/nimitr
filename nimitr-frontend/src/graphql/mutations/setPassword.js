import gql from 'graphql-tag'

export default gql`
mutation ($_id: String!, $password: String!){
    setPassword (_id: $_id, password: $password){
        username
    }
}
`

