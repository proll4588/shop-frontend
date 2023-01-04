import { LOGIN, REGISTRATION_ACCOUNT } from './../apollo/fetchs'
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import tokenAtom from '../atoms/token.atom'
import { getLink } from '../apollo/link'
import adminAtom from '../atoms/admin.atom'

const useAuth = () => {
    const setToken = useSetRecoilState(tokenAtom)
    const setAdmin = useSetRecoilState(adminAtom)
    const client = useApolloClient()

    const [registrateUser, regStatus] = useMutation(REGISTRATION_ACCOUNT)
    const [loginUser, loginStatus] = useLazyQuery(LOGIN)

    // Получении токена при регистрации
    useEffect(() => {
        if (regStatus.data) {
            const t = regStatus.data.registration.token

            localStorage.setItem('token', t)
            client.setLink(getLink())
            setToken(t)
        }
    }, [regStatus.data])

    // При получении токена при входе в систему
    useEffect(() => {
        if (loginStatus.data) {
            const t = loginStatus.data.login.token
            const isAdmin = loginStatus.data.login.isAdmin

            localStorage.setItem('token', t)
            client.setLink(getLink())
            setToken(t)
            setAdmin(isAdmin)
        }
    }, [loginStatus.data])

    const registrate = (email, password) => {
        registrateUser({
            variables: {
                email,
                password,
            },
        })
    }

    const login = (email, password) => {
        loginUser({
            variables: {
                email,
                password,
            },
        })
    }

    return { registrate, login, regStatus, loginStatus }
}

export default useAuth
