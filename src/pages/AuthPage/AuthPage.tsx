import React, { FC, useState } from 'react'
import LoginCard from '../../components/LoginCard/LoginCard'
import RegCard from '../../components/RegCard/RegCard'
import styles from './AuthPage.module.scss'
import AuthPageProps from './AuthPage.props'

const AuthPage: FC<AuthPageProps> = () => {
    const [isLogin, setIsLogin] = useState(false)

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
