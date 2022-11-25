import classNames from 'classnames'
import React, { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import Square from '../Square/Square'
import styles from './FavoriteButton.module.scss'
import FavoriteButtonProps from './FavoriteButton.props'

const FavoriteButton: FC<FavoriteButtonProps> = ({
    onClick,
    value,
    disable,
}) => {
    return (
        <Square
            icon={
                <AiOutlineHeart
                    className={classNames(
                        styles.FavoriteButton__icon,
                        value ? styles.FavoriteButton__icon_active : ''
                    )}
                />
            }
            // active={value}
            error={value}
            onClick={() => {
                onClick(!value)
            }}
            disasble={disable}
        />
    )
}

export default FavoriteButton
