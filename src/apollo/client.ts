import {
    ApolloClient,
    ApolloLink,
    concat,
    HttpLink,
    InMemoryCache,
} from '@apollo/client'

const httpLink = new HttpLink({ uri: 'http://192.168.0.42:4000/' })

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    })
    return forward(operation)
})

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache({
        typePolicies: { FiltersListDataElement: { keyFields: ['value'] } },
    }),
})

export default client
