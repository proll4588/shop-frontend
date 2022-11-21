import React, { FC } from 'react'
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { DiReact } from 'react-icons/di'
import { FcGoogle } from 'react-icons/fc'
import styles from './Footer.module.scss'
import FooterProps from './Footer.props'

const Footer: FC<FooterProps> = () => {
    return (
        <div className={styles.Footer}>
            <div className={styles.Footer__container}>
                <div className={styles.Footer__top}>
                    <div className={styles.Footer__c1}>
                        {/* <div className={styles.Footer__iconContaine}></div> */}
                        <DiReact className={styles.Footer__icon} />
                        <p className={styles.Footer__text}>
                            Accessories Here you can find the best computer
                            accessory for your laptop
                        </p>
                        <div className={styles.Footer__icons}>
                            <FcGoogle className={styles.Footer__iconSoc} />
                            <AiOutlineTwitter
                                className={styles.Footer__iconSoc}
                            />
                            <BsFacebook className={styles.Footer__iconSoc} />
                        </div>
                    </div>
                    <div className={styles.Footer__c2}>
                        <div className={styles.Footer__title}>
                            Help and information
                        </div>
                        <ul className={styles.Footer__list}>
                            <li className={styles.Footer__listItem}>
                                Help and FAQs
                            </li>
                            <li className={styles.Footer__listItem}>
                                Track order
                            </li>
                            <li className={styles.Footer__listItem}>
                                Shipping and Delivery
                            </li>
                            <li className={styles.Footer__listItem}>
                                Delivery and Returns
                            </li>
                        </ul>
                    </div>
                    <div className={styles.Footer__c3}>
                        <div className={styles.Footer__title}>Contact Info</div>
                        <ul className={styles.Footer__list}>
                            <li className={styles.Footer__listItem}>
                                Street Name, City, England
                            </li>
                            <li className={styles.Footer__listItem}>
                                mail@example.com
                            </li>
                            <li className={styles.Footer__listItem}>
                                (123) 456-7890
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.Footer__buttom}>
                    <div className={styles.Footer__buttomLeft}>
                        @Copyright 2022 The Dot.
                    </div>
                    <div className={styles.Footer__buttomRight}>
                        Privacy & Cookies Accessibility
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
