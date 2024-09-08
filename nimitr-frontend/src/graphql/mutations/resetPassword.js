import gql from 'graphql-tag'

export default gql`
    mutation Mutation($email: String!) 
    {
        resetPassword(email: $email)
    }
`
