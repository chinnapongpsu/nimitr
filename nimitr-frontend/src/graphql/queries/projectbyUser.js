import gql from 'graphql-tag'

export default gql`
  query Projects($filter: FilterFindManyProjectInput) {
  projects(filter: $filter) {
    _id
    name
    type
    projectStatus
  }
}
`
