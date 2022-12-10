import { ApolloLink, concat, HttpLink } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

export const getLink = () => {
    const httpLink = new createUploadLink({
        uri: `http://${process.env.REACT_APP_IP}/graphql`,
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
