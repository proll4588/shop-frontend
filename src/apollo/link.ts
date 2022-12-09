import { ApolloLink, concat, HttpLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

export const getLink = () => {
    // const httpLink = new HttpLink({ uri: 'http://192.168.0.42:4000/graphql' })
    const httpLink = new createUploadLink({
        uri: 'http://192.168.0.42:4000/graphql',
        // uri: 'http://151.248.115.92:4000/graphql',
    })

    const authMiddleware = new ApolloLink((operation, forward) => {
        const token = localStorage.getItem('token')
        operation.setContext({
            headers: {
                authorization: token && token !== 'null' ? `${token}` : '',
                'apollo-require-preflight': true,
            },
        })
        return forward(operation)
    })

    return concat(authMiddleware, httpLink)
}
