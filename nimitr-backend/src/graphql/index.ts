import { schemaComposer } from 'graphql-compose'

import queryFields from './queries'
import mutationFields from './mutations'
// import subscriptionFields from './subscription'
import { makeExecutableSchema } from '@graphql-tools/schema'

schemaComposer.Query.addFields(queryFields)
schemaComposer.Mutation.addFields(mutationFields)
// schemaComposer.Subscription.addFields(subscriptionFields)

const GQLSchema = schemaComposer.buildSchema()

export default GQLSchema
