import {
  ApolloClient, InMemoryCache, HttpLink, split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloLink } from 'apollo-link'
import { createClient } from 'graphql-ws'

import { checkTokenExpired } from './contexts/AuthContext'

// import { publicConfig } from "./lib/endpoint";

// import { checkTokenExpired } from '../contexts/AuthContext'
// import { ApolloClient } from 'apollo-client';

export const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const { token, user } = checkTokenExpired(localStorage.getItem('token'))
    if (token && user) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      }
    }
    return { headers }
  })
  return forward(operation)
})

// const GraphSubScription = publicConfig?.wsEndpoint;
// const GraphHttp = publicConfig?.httpEndpoint;
const httpLink = ApolloLink.from([
  authMiddleware,
  new HttpLink({
    uri: process.env.REACT_APP_GRAPHHTTP,
  }),
])
const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_GRAPHQLSUBSCRIPTION,
    connectionParams: () => {
      // Note: getSession() is a placeholder function created by you
      const { token, user } = checkTokenExpired(localStorage.getItem('token'))
      if (token && user) {
        return {
          Authorization: `Bearer ${token}`,
        }
      }
      return {}
    },
  }),
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  defaultOptions: {
    watchQuery: {
      returnPartialData: false,
    },
  },
})

export default client
