import gql from 'graphql-tag'

export default gql`
mutation ( $username: String!, $firstname: String, $lastname: String,  $role: EnumUserRole!, $rank: EnumUserRank!, $mobile:String,$email:String){
    createMemberUser(record: {
        username:  $username,
        firstname: $firstname,
        lastname: $lastname,
        role: $role,
        rank: $rank,
        mobile: $mobile,
        email: $email
        }) {
        recordId
    }
}
`
