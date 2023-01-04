import React, { FC } from 'react'
import styles from './AppSwither.module.scss'
import AppSwitherProps from './AppSwither.props'
import Button from '../UI/Button/Button'
import { AiOutlineEdit } from 'react-icons/ai'
import { useRecoilState } from 'recoil'
import appTypesAtom, { appTypes } from '../../atoms/appType.atom'
import { useNavigate } from 'react-router-dom'

const AppSwither: FC<AppSwitherProps> = () => {
    const [appType, setAppType] = useRecoilState(appTypesAtom)
    const nav = useNavigate()

    const change = () => {
        setAppType(
            appType === appTypes.CONTROL ? appTypes.SHOP : appTypes.CONTROL
        )
        nav('/')
    }

    return (
        <div className={styles.AppSwither}>
            <div className={styles.AppSwither__container}>
                <Button onClick={change}>
                    <AiOutlineEdit />
                </Button>
            </div>
        </div>
    )
}

export default AppSwither
