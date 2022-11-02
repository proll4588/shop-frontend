import React, { FC, useState } from 'react'
import Button from '../UI/Button/Button'
import Checkbox from '../UI/Checkbox/Checkbox'
import Input from '../UI/Input/Input'
import styles from './RegCard.module.scss'
import RegCardProps from './RegCard.props'

// TODO: сделать валидацию пароля и почты
const RegCard: FC<RegCardProps> = ({ onChange }) => {
    // const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rem, setRem] = useState(false)

    return (
        <div className={styles.RegCard}>
            <div className={styles.RegCard__container}>
                <h2 className={styles.RegCard__title}>Create Account</h2>
                <h5 className={styles.RegCard__loginTitle}>
                    Or use your email to registration
                </h5>
                <div className={styles.RegCard__inputBlock}>
                    {/* <Input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={setName}
                        className={styles.RegCard__input}
                    /> */}
                    <Input
                        type='text'
                        placeholder='E-mail'
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
                    <Button className={styles.RegCard__button}>Sign Up</Button>
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
