import React, { FC, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { PHOTO_PAHT } from '../../apollo/fetchs'
import useRating from '../../hooks/rating.hook'
import Button from '../UI/Button/Button'
import Square from '../UI/Square/Square'
import styles from './RatingCreater.module.scss'
import RatingCreaterProps from './RatingCreater.props'

const NoUser = () => {
    return (
        <div className={styles.RatingCreater__noDataContainer}>
            Авторизируйтесь чтобы написать отзыв
        </div>
    )
}

interface StarSelectorProps {
    value: number
    onChange?: (val: number) => void
}
const StarSelector: FC<StarSelectorProps> = ({ value, onChange }) => {
    const mas = [0, 0, 0, 0, 0]

    const clickHandler = (val) => {
        onChange && onChange(val)
    }

    return (
        <div className={styles.StarSelector}>
            {mas.map((el, index) => (
                <AiFillStar
                    key={index}
                    className={styles.StarSelector__star}
                    color={index < value ? '#FFB000' : '#888A91'}
                    onClick={() => {
                        clickHandler(index + 1)
                    }}
                />
            ))}
        </div>
    )
}

const RatingCreater: FC<RatingCreaterProps> = ({ user, rating }) => {
    const { goodId } = useParams()
    const { createRating, deleteRating, updateRating } = useRating(
        Number(goodId)
    )

    const [starSelected, setStarSelected] = useState(rating ? rating.rating : 1)
    const [text, setText] = useState(
        rating ? (rating.text ? rating.text : '') : ''
    )

    if (!user) return <NoUser />

    let name = ''
    name += user.fname ? user.fname + ' ' : ''
    name += user.lname ? user.lname : ''

    if (!name.length) {
        name = 'id' + String(user.id)
    }

    const clickHandler = () => {
        if (rating) updateRating(starSelected, text)
        else createRating(starSelected, text)
    }

    const deleteHandler = () => {
        deleteRating()
    }

    return (
        <div className={styles.RatingCreater}>
            <div className={styles.RatingCreater__container}>
                <div className={styles.RatingCreater__up}>
                    <div className={styles.RatingCreater__userInfo}>
                        <div className={styles.RatingCreater__photoContaienr}>
                            {user.photo && (
                                <img
                                    src={PHOTO_PAHT + user.photo}
                                    alt={user.fname}
                                    className={styles.RatingCreater__photo}
                                />
                            )}
                        </div>
                        <div className={styles.RatingCreater__right}>
                            <div className={styles.RatingCreater__fullName}>
                                {name}
                            </div>

                            <div className={styles.UserRating__rating}>
                                <StarSelector
                                    value={starSelected}
                                    onChange={setStarSelected}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.RatingCreater__buttns}>
                        <Button onClick={clickHandler}>
                            {rating ? 'Изменить' : 'Опубликовать'}
                        </Button>
                        {rating && (
                            <Square
                                icon={
                                    <MdDeleteOutline onClick={deleteHandler} />
                                }
                            />
                        )}
                    </div>
                </div>
                <div className={styles.RatingCreater__down}>
                    <textarea
                        className={styles.RatingCreater__area}
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default RatingCreater
