import React, { FC } from 'react'
import styles from './MyMenu.module.scss'
import MyMenuProps from './MyMenu.props'
import { Menu } from '@headlessui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IconContext } from 'react-icons'

const MyMenu: FC<MyMenuProps> = ({ items }) => {
    return (
        <div className={styles.MyMenu}>
            <Menu>
                <div className={styles.MyMenu__mainContainer}>
                    <Menu.Button className={styles.MyMenu__openButton}>
                        <BsThreeDotsVertical
                            className={styles.MyMenu__dotIcon}
                        />
                    </Menu.Button>
                </div>

                <Menu.Items>
                    <div className={styles.MyMenu__list}>
                        {items.map((item) => (
                            <Menu.Item key={item.id}>
                                {({ active }) => (
                                    <button
                                        onClick={item.onClick}
                                        className={styles.MyMenu__item}
                                    >
                                        <IconContext.Provider
                                            value={{
                                                className:
                                                    styles.MyMenu__btnIcon,
                                            }}
                                        >
                                            {item.icon}
                                        </IconContext.Provider>

                                        <div
                                            className={styles.MyMenu__itemText}
                                        >
                                            {item.text}
                                        </div>
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default MyMenu
