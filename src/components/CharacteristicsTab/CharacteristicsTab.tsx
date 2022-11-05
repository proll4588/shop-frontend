import React, { FC } from 'react'
import { ICharacteristicGroup } from '../../interfaces/characteristics.interface'
import styles from './CharacteristicsTab.module.scss'
import CharacteristicsTabProps from './CharacteristicsTab.props'

/*========================================================*/
interface CharacteristicsItemProps {
    paramName: string
    value: string
}
const CharacteristicsItem: FC<CharacteristicsItemProps> = ({
    paramName,
    value,
}) => {
    return (
        <li className={styles.CharacteristicsItem}>
            <div className={styles.CharacteristicsItem__name}>{paramName}</div>
            <div className={styles.CharacteristicsItem__value}>{value}</div>
        </li>
    )
}
/*========================================================*/

/*========================================================*/
interface CharacteristicsGroupProps {
    group: ICharacteristicGroup
}
const CharacteristicsGroup: FC<CharacteristicsGroupProps> = ({ group }) => {
    return (
        <div className={styles.CharacteristicsGroup}>
            <div className={styles.CharacteristicsGroup__container}>
                <h4 className={styles.CharacteristicsGroup__groupName}>
                    {group.name}
                </h4>

                <ul className={styles.CharacteristicsGroup__items}>
                    {group.items.map((item) => {
                        return (
                            <CharacteristicsItem
                                key={item.id}
                                paramName={item.name}
                                value={item.value}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
/*========================================================*/

const CharacteristicsTab: FC<CharacteristicsTabProps> = ({
    characteristics,
}) => {
    return (
        <div className={styles.CharacteristicsTab}>
            <div className={styles.CharacteristicsTab__container}>
                {characteristics.map((group) => {
                    return (
                        <CharacteristicsGroup
                            group={group}
                            key={group.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CharacteristicsTab
