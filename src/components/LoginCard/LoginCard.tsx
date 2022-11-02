import React, { FC, useState } from 'react'
import Button from '../UI/Button/Button'
import Checkbox from '../UI/Checkbox/Checkbox'
import Input from '../UI/Input/Input'
import styles from './LoginCard.module.scss'
import LoginCardProps from './LoginCard.props'

// TODO: сделать валидацию пароля и почты
const LoginCard: FC<LoginCardProps> = ({ onChange }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rem, setRem] = useState(false)

    return (
        <div className={styles.LoginCard}>
            <div className={styles.LoginCard__container}>
                <h2 className={styles.LoginCard__title}>Sign in</h2>
                <h5 className={styles.LoginCard__loginTitle}>Log in</h5>
                <div className={styles.LoginCard__inputBlock}>
                    <Input
                        type='text'
                        placeholder='E-mail'
                        value={email}
                        onChange={setEmail}
                        className={styles.LoginCard__input}
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={setPassword}
                        className={styles.LoginCard__input}
                    />
                </div>

                <Checkbox
                    lable='Remember me'
                    onChange={setRem}
                    state={rem}
                    className={styles.LoginCard__check}
                />

                <div className={styles.LoginCard__buttonBlock}>
                    <Button className={styles.LoginCard__button}>
                        Sign In
                    </Button>
                    <Button
                        className={styles.LoginCard__button}
                        secondary
                        onClick={onChange}
                    >
                        Sign Up
                    </Button>
                </div>

                <p className={styles.LoginCard__policy}>
                    This site is protected by reCAPTCHA an th Google Privacy
                    Policy an Terms of Service apply
                </p>
            </div>
        </div>
    )
}

export default LoginCard
