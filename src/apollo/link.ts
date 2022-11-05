import { ApolloLink, concat, HttpLink } from '@apollo/client'

export const getLink = () => {
    const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

    const authMiddleware = new ApolloLink((operation, forward) => {
        const token = localStorage.getItem('token')
        operation.setContext({
            headers: {
                authorization: token && token !== 'null' ? `${token}` : '',
            },
        })
        return forward(operation)
    })

    return concat(authMiddleware, httpLink)
}