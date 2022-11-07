import React, { FC, ReactNode, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCardChecklist, BsFillPersonFill } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FaRegCreditCard } from 'react-icons/fa'
import styles from './UserNav.module.scss'
import UserNavProps from './UserNav.props'
import { IconContext } from 'react-icons'
import classNames from 'classnames'
import { MdOutlineLogout } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const menu = [
    {
        id: 1,
        name: 'Personal Info',
        icon: <BsFillPersonFill />,
        link: 'personalInfo',
    },
    { id: 2, name: 'Favorite', icon: <AiOutlineHeart />, link: 'favorite' },
    { id: 3, name: 'Orders', icon: <BsCardChecklist />, link: 'orders' },
    {
        id: 4,
        name: 'Notification',
        icon: <IoMdNotificationsOutline />,
        link: 'notifications',
    },
    { id: 5, name: 'Payment', icon: <FaRegCreditCard />, link: 'payment' },
]

const UserInfo = ({ userInfo }) => {
    const { email, lname, fname, photo } = userInfo
    return (
        <div className={styles.UserNav__userInfo}>
            <div className={styles.UserNav__photoContainer}>
                {photo && (
                    <img
                        src={photo}
                        alt='userPhoto'
                        className={styles.UserNav__photo}
                    />
                )}
            </div>

            <div className={styles.UserNav__userName}>
                {`${fname} ${lname}`}
            </div>

            <div className={styles.UserNav__userEmail}>{email}</div>
        </div>
    )
}

const Nav = () => {
    return (
        <div className={styles.UserNav__navContainer}>
            <div className={styles.UserNav__navLine} />
            <div className={styles.UserNav__navList}>
                {menu.map((el) => (
                    <NavElement
                        icon={el.icon}
                        name={el.name}
                        link={el.link}
                        key={el.id}
                    />
                ))}
            </div>

            <div className={styles.UserNav__navLine} />

            <div className={styles.UserNav__navLogout}>
                <NavElement
                    icon={<MdOutlineLogout />}
                    name='Logout'
                    // isActive={false}
                    link={'logout'}
                />
            </div>
        </div>
    )
}

interface NavElementProps {
    icon: ReactNode
    name: string
    link: string
}
const NavElement: FC<NavElementProps> = ({ icon, name, link }) => {
    return (
        <NavLink
            to={link}
            className={({ isActive }) => {
                return classNames(
                    styles.UserNav__navElementContainer,
                    isActive ? styles.UserNav__navElementContainer_active : ''
                )
            }}
        >
            {({ isActive }) => (
                <>
                    <IconContext.Provider
                        value={{
                            className: classNames(
                                styles.UserNav__navElementIcon,
                                isActive
                                    ? styles.UserNav__navElementIcon_active
                                    : ''
                            ),
                        }}
                    >
                        {icon}
                    </IconContext.Provider>
                    <div className={styles.UserNav__navElementName}>{name}</div>
                </>
            )}
        </NavLink>
    )
}

const UserNav: FC<UserNavProps> = ({ userInfo }) => {
    return (
        <div className={styles.UserNav}>
            <div className={styles.UserNav__container}>
                <UserInfo userInfo={userInfo} />
                <Nav />
            </div>
        </div>
    )
}

export default UserNav
