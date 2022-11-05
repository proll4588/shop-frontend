import { ApolloClient, InMemoryCache } from '@apollo/client'
import { getLink } from './link'

const client = new ApolloClient({
    link: getLink(),
    cache: new InMemoryCache({
        typePolicies: { FiltersListDataElement: { keyFields: ['value'] } },
    }),
})

export default client
