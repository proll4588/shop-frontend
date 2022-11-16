import React, { FC, useEffect } from 'react'
import {
    AiOutlineHeart,
    AiOutlineSearch,
    AiOutlineShoppingCart,
    AiOutlineUser,
} from 'react-icons/ai'
import IconCard from '../UI/IconCard/IconCard'
import styles from './Header.module.scss'
import HeaderProps from './Header.props'
import { DiReact } from 'react-icons/di'
import { Link } from 'react-router-dom'
import Input from '../UI/Input/Input'
import { useRecoilValue } from 'recoil'
import tokenAtom from '../../atoms/token.atom'
import countsAtom from '../../atoms/counts.atom'

const Header: FC<HeaderProps> = () => {
    const token = useRecoilValue(tokenAtom)
    const counts = useRecoilValue(countsAtom)

    return (
        <div className={styles.Header}>
            <div className={styles.Header__container}>
                <div className={styles.Header__up}>
                    <div className={styles.Header__upContainer}>
                        <div className={styles.Header__sity}>Город: ...</div>

                        <div className={styles.Header__sitySelect}>
                            Выбрать другой город
                        </div>
                    </div>
                </div>

                <div className={styles.Header__main}>
                    <div className={styles.Header__mainContainer}>
                        <Link
                            to='/'
                            className={styles.Header__logo}
                        >
                            <DiReact className={styles.Header__logoIcon} />
                        </Link>

                        <Input
                            value=''
                            type='text'
                            placeholder='Search'
                            icon={<AiOutlineSearch />}
                        />

                        <div className={styles.Header__iconCardList}>
                            <IconCard
                                icon={<AiOutlineShoppingCart />}
                                to={'/cart'}
                                number={counts.cart}
                                // title={'Корзина'}
                                // text={'1 000р'}
                            />
                            <IconCard
                                icon={<AiOutlineHeart />}
                                to={'/account/favorite'}
                                number={counts.favorite}
                                // title={'Избранное'}
                                // text={'1 000р'}
                            />
                            <IconCard
                                icon={<AiOutlineUser />}
                                to={token ? '/account' : '/auth'}
                                number={1}
                                // title={'Войти'}
                                // text={'или зарегестрироватся'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
