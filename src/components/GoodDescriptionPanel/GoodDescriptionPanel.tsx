import classNames from 'classnames'
import React, { FC, useState } from 'react'
import CharacteristicsTab from '../CharacteristicsTab/CharacteristicsTab'
import DescriptionTab from '../DescriptionTab/DescriptionTab'
import Rating from '../Rating/Rating'
import styles from './GoodDescriptionPanel.module.scss'
import GoodDescriptionPanelProps from './GoodDescriptionPanel.props'

enum Pages {
    DESCRIPTION = 'description',
    CHARACTERISTICS = 'characteristics',
    REVIEWS = 'reviews',
}

interface HeadProps {
    onChange?: (page: Pages) => void
    currentPage: Pages
}
const Head: FC<HeadProps> = ({ onChange, currentPage }) => {
    const clickhandler = (page: Pages) => {
        onChange && onChange(page)
    }

    return (
        <ul className={styles.GoodDescriptionPanel__head}>
            <li
                className={styles.GoodDescriptionPanel__headItem}
                onClick={() => {
                    clickhandler(Pages.DESCRIPTION)
                }}
            >
                <h4 className={styles.GoodDescriptionPanel__headTitle}>
                    Description
                </h4>
                <div
                    className={classNames(
                        styles.GoodDescriptionPanel__headItemLine,
                        currentPage === Pages.DESCRIPTION
                            ? styles.GoodDescriptionPanel__headItemLine_active
                            : ''
                    )}
                />
            </li>

            <li
                className={styles.GoodDescriptionPanel__headItem}
                onClick={() => {
                    clickhandler(Pages.CHARACTERISTICS)
                }}
            >
                <h4 className={styles.GoodDescriptionPanel__headTitle}>
                    Characteristics
                </h4>
                <div
                    className={classNames(
                        styles.GoodDescriptionPanel__headItemLine,
                        currentPage === Pages.CHARACTERISTICS
                            ? styles.GoodDescriptionPanel__headItemLine_active
                            : ''
                    )}
                />
            </li>

            <li
                className={styles.GoodDescriptionPanel__headItem}
                onClick={() => {
                    clickhandler(Pages.REVIEWS)
                }}
            >
                <h4 className={styles.GoodDescriptionPanel__headTitle}>
                    Reviews
                </h4>
                <div
                    className={classNames(
                        styles.GoodDescriptionPanel__headItemLine,
                        currentPage === Pages.REVIEWS
                            ? styles.GoodDescriptionPanel__headItemLine_active
                            : ''
                    )}
                />
            </li>
        </ul>
    )
}

const GoodDescriptionPanel: FC<GoodDescriptionPanelProps> = ({
    characteristics,
    description,
    reviews,
}) => {
    const [page, setPage] = useState<Pages>(Pages.DESCRIPTION)

    return (
        <div className={styles.GoodDescriptionPanel}>
            <div className={styles.GoodDescriptionPanel__container}>
                <Head
                    currentPage={page}
                    onChange={setPage}
                />
                {page === Pages.DESCRIPTION && (
                    <DescriptionTab descriprion={description} />
                )}
                {page === Pages.CHARACTERISTICS && (
                    <CharacteristicsTab characteristics={characteristics} />
                )}
                {page === Pages.REVIEWS && <Rating />}
            </div>
        </div>
    )
}

export default GoodDescriptionPanel
