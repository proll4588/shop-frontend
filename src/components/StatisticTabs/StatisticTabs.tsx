import React, { FC, useState } from 'react'
import styles from './StatisticTabs.module.scss'
import StatisticTabsProps from './StatisticTabs.props'
import classNames from 'classnames'

const els = [
    'По годам',
    'По глобальным типам',
    'По локальным типам',
    'По подтипам',
]

interface StatisticTabsHeadProps {
    selected: number
    onChange?: (id: number) => void
}
const StatisticTabsHead: FC<StatisticTabsHeadProps> = ({
    selected,
    onChange,
}) => {
    return (
        <div className={styles.StatisticTabsHead}>
            <div className={styles.StatisticTabsHead__container}>
                <ul className={styles.StatisticTabsHead__list}>
                    {els.map((el, index) => (
                        <li
                            className={classNames(
                                styles.StatisticTabsHead__el,
                                selected === index
                                    ? styles.StatisticTabsHead__el_selected
                                    : ''
                            )}
                            onClick={() => {
                                onChange(index)
                            }}
                            key={index}
                        >
                            {el}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const StatisticTabs: FC<StatisticTabsProps> = ({ tabs }) => {
    const [currentTab, setCurrentTab] = useState(0)

    const onChangeTab = (id) => {
        setCurrentTab(id)
    }

    return (
        <div className={styles.StatisticTabs}>
            <div className={styles.StatisticTabs__container}>
                <StatisticTabsHead
                    selected={currentTab}
                    onChange={onChangeTab}
                />
                <div className={styles.StatisticTabs__tab}>
                    {tabs[currentTab]}
                </div>
            </div>
        </div>
    )
}

export default StatisticTabs
