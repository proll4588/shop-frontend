import { LOGIN, REGISTRATION_ACCOUNT } from './../apollo/fetchs'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import tokenAtom from '../atoms/token.atom'

const useAuth = () => {
    const setToken = useSetRecoilState(tokenAtom)

    const [registrateUser, regStatus] = useMutation(REGISTRATION_ACCOUNT)
    const [loginUser, loginStatus] = useLazyQuery(LOGIN)

    // При получении токена при регистрации
    useEffect(() => {
        regStatus.data && setToken(regStatus.data.registration.token)
    }, [regStatus.data])

    // При получении токена при входе в систему
    useEffect(() => {
        loginStatus.data && setToken(loginStatus.data.login.token)
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
