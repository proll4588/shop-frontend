import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { GET_GOOD_RATING } from '../../apollo/fetchs'
import RatingStatistics from '../RatingStatistics/RatingStatistics'
import RatingWiever from '../RatingWiever/RatingWiever'
import styles from './Rating.module.scss'
import RatingProps from './Rating.props'

const Rating: FC<RatingProps> = () => {
    const { goodId } = useParams()
    const { data, error, loading } = useQuery(GET_GOOD_RATING, {
        variables: {
            goodId: Number(goodId),
        },
    })

    if (loading) return <>Loading</>
    if (error) return <>error</>

    return (
        <div className={styles.Rating}>
            <div className={styles.Rating__container}>
                <RatingStatistics ratings={data.getRating} />
                <RatingWiever />
            </div>
        </div>
    )
}

export default Rating
