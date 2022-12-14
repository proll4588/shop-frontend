import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { GET_GOOD_RATING, GET_USER_DATA } from '../../apollo/fetchs'
import RatingCreater from '../RatingCreater/RatingCreater'
import RatingStatistics from '../RatingStatistics/RatingStatistics'
import RatingWiever from '../RatingWiever/RatingWiever'
import Loader from '../UI/Loader/Loader'
import styles from './Rating.module.scss'
import RatingProps from './Rating.props'

const Rating: FC<RatingProps> = () => {
    const { goodId } = useParams()
    const { data, error, loading } = useQuery(GET_GOOD_RATING, {
        variables: {
            goodId: Number(goodId),
        },
    })
    const userData = useQuery(GET_USER_DATA)

    if (loading) return <Loader />
    if (error) return <>error</>

    return (
        <div className={styles.Rating}>
            <div className={styles.Rating__container}>
                <div className={styles.Rating__up}>
                    <RatingStatistics ratings={data.getRating} />
                    {userData.loading || loading ? (
                        <>Loading</>
                    ) : (
                        <RatingCreater
                            user={userData.data ? userData.data.userData : null}
                            rating={
                                userData.data
                                    ? data.getRating.find(
                                          (el) =>
                                              el.users.id ===
                                              userData.data.userData.id
                                      )
                                    : null
                            }
                        />
                    )}
                </div>

                <RatingWiever ratings={data.getRating} />
            </div>
        </div>
    )
}

export default Rating
