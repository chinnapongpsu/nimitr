import gql from 'graphql-tag'

export default gql`
  query UserId($id: MongoID!) {
    userId(_id: $id) {
      _id
      username
      rank
      userExpirationTime
      maxprojects
      maxcontents
      maxmarkers
      maxperuse
      maxsizevideo
      maxsizemodel
      maxsizeaudio
    }
  }
`
