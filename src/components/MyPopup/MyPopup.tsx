import React, { FC } from 'react'
import styles from './MyPopup.module.scss'
import MyPopupProps from './MyPopup.props'
import { Dialog } from '@headlessui/react'

const MyPopup: FC<MyPopupProps> = ({ children, title, close, isOpen }) => {
    return (
        <Dialog
            onClose={close}
            open={isOpen}
            as='div'
            className={styles.MyPopup__dialog}
        >
            <div className={styles.MyPopup__back} />

            <div className={styles.MyPopup__dialogContent}>
                <Dialog.Panel className={styles.MyPopup__dialogPanel}>
                    <Dialog.Title
                        as='h3'
                        className={styles.MyPopup__dialogTitle}
                        style={{ marginBottom: 20 }}
                    >
                        {title}
                    </Dialog.Title>

                    {children}
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default MyPopup
