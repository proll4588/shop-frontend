import React, { FC, useState } from 'react'
import useAuth from '../../hooks/auth.hook'
import Button from '../UI/Button/Button'
import Checkbox from '../UI/Checkbox/Checkbox'
import Input from '../UI/Input/Input'
import styles from './LoginCard.module.scss'
import LoginCardProps from './LoginCard.props'

const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// TODO: сделать валидацию пароля и почты
const LoginCard: FC<LoginCardProps> = ({ onChange }) => {
    const { login, loginStatus } = useAuth()
    const { loading, error, data } = loginStatus

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rem, setRem] = useState(false)

    const loginAccount = () => {
        const isPassword = password.length >= 8
        const isEmail = pattern.test(email)

        if (isEmail && isPassword) login(email, password)
    }

    return (
        <div className={styles.LoginCard}>
            <div className={styles.LoginCard__container}>
                <h2 className={styles.LoginCard__title}>Вход</h2>
                {/* <h5 className={styles.LoginCard__loginTitle}>Log in</h5> */}
                <div className={styles.LoginCard__inputBlock}>
                    <Input
                        type='text'
                        placeholder='Ел. почта'
                        isError={
                            error && error.message === 'Пользователь не найден'
                        }
                        value={email}
                        onChange={setEmail}
                        className={styles.LoginCard__input}
                    />
                    <Input
                        type='password'
                        placeholder='Пароль'
                        isError={error && error.message === 'Пароль не верный'}
                        value={password}
                        onChange={setPassword}
                        className={styles.LoginCard__input}
                    />
                </div>

                <Checkbox
                    lable='Запомнить меня (всё равно запомнит)'
                    onChange={setRem}
                    state={rem}
                    className={styles.LoginCard__check}
                />

                <div className={styles.LoginCard__buttonBlock}>
                    <Button
                        className={styles.LoginCard__button}
                        onClick={loginAccount}
                        disable={loading}
                    >
                        Войти
                    </Button>
                    <Button
                        className={styles.LoginCard__button}
                        secondary
                        onClick={onChange}
                    >
                        Зарегестрироватся
                    </Button>
                </div>

                <p className={styles.LoginCard__policy}>бла бла бла</p>
            </div>
        </div>
    )
}

export default LoginCard
