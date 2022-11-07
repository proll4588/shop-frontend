import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import tokenAtom from '../../atoms/token.atom'
import LoginCard from '../../components/LoginCard/LoginCard'
import RegCard from '../../components/RegCard/RegCard'
import styles from './AuthPage.module.scss'
import AuthPageProps from './AuthPage.props'

const AuthPage: FC<AuthPageProps> = () => {
    const token = useRecoilValue(tokenAtom)
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false)

    useLayoutEffect(() => {
        if (token !== null && token !== 'null') {
            navigate('/account/personalInfo')
        }
    }, [token])

    const changeAuthForm = () => {
        setIsLogin((prev) => !prev)
    }

    return (
        <div className={styles.AuthPage}>
            <div className={styles.AuthPage__container}>
                {isLogin ? (
                    <LoginCard onChange={changeAuthForm} />
                ) : (
                    <RegCard onChange={changeAuthForm} />
                )}
            </div>
        </div>
    )
}

export default AuthPage
