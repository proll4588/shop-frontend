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
                <h2 className={styles.RegCard__title}>Create Account</h2>
                <h5 className={styles.RegCard__loginTitle}>
                    Or use your email to registration
                </h5>
                <div className={styles.RegCard__inputBlock}>
                    <Input
                        type='text'
                        placeholder='E-mail'
                        isError={
                            error && error.message === 'User is already exist'
                        }
                        value={email}
                        onChange={setEmail}
                        className={styles.RegCard__input}
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={setPassword}
                        className={styles.RegCard__input}
                    />
                </div>

                <Checkbox
                    lable='I agree to the Terms and Privacy Policy'
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
                        Sign Up
                    </Button>
                    <Button
                        className={styles.RegCard__button}
                        secondary
                        onClick={onChange}
                    >
                        Sign in
                    </Button>
                </div>

                <p className={styles.RegCard__policy}>
                    This site is protected by reCAPTCHA an th Google Privacy
                    Policy an Terms of Service apply
                </p>
            </div>
        </div>
    )
}

export default RegCard
