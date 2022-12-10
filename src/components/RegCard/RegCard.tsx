import React, { FC, useState } from 'react'
import useAuth from '../../hooks/auth.hook'
import Button from '../UI/Button/Button'
import Checkbox from '../UI/Checkbox/Checkbox'
import Input from '../UI/Input/Input'
import styles from './RegCard.module.scss'
import RegCardProps from './RegCard.props'

const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// TODO: сделать валидацию пароля и почты
const RegCard: FC<RegCardProps> = ({ onChange }) => {
    const { registrate, regStatus } = useAuth()
    const { loading, error, data } = regStatus

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rem, setRem] = useState(false)

    const createAccount = () => {
        const isPassword = password.length >= 8
        const isEmail = pattern.test(email)

        if (isEmail && isPassword) registrate(email, password)
    }

    return (
        <div className={styles.RegCard}>
            <div className={styles.RegCard__container}>
                <h2 className={styles.RegCard__title}>Регистрация</h2>
                <h5 className={styles.RegCard__loginTitle}>
                    Используйте электрнную почту
                </h5>
                <div className={styles.RegCard__inputBlock}>
                    <Input
                        type='text'
                        placeholder='Эл. почта'
                        isError={
                            error &&
                            error.message === 'Пользователь уже существует'
                        }
                        value={email}
                        onChange={setEmail}
                        className={styles.RegCard__input}
                    />
                    <Input
                        type='password'
                        placeholder='Пароль'
                        value={password}
                        onChange={setPassword}
                        className={styles.RegCard__input}
                    />
                </div>

                <Checkbox
                    lable='Я согласен с политикой компании (не обязательно)'
                    onChange={setRem}
                    state={rem}
                    className={styles.RegCard__check}
                />

                <div className={styles.RegCard__buttonBlock}>
                    <Button
                        className={styles.RegCard__button}
                        onClick={createAccount}
                        disable={loading}
                    >
                        Зарегестрироватся
                    </Button>
                    <Button
                        className={styles.RegCard__button}
                        secondary
                        onClick={onChange}
                    >
                        Войти
                    </Button>
                </div>

                <p className={styles.RegCard__policy}>
                    Бла бла бла бла бла бла бла и ещё много раз Блаааа
                </p>
            </div>
        </div>
    )
}

export default RegCard
