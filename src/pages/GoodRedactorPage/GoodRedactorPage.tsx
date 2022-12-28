import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { GET_DATA_FOR_GOOD_PAGE } from '../../apollo/fetchs'
import styles from './GoodRedactorPage.module.scss'
import GoodRedactorPageProps from './GoodRedactorPage.props'
import { IGood } from '../../interfaces/good.interface'

import { ICharacteristics } from '../../interfaces/characteristics.interface'
import Loader from '../../components/UI/Loader/Loader'
import { Photo } from '../../components/GoodPhotoRedactor'
import GoodContext from '../../contexts/good.context'
import { Description } from '../../components/GoodDescriptionRedactor'
import { Price } from '../../components/GoodPriceRedactor'
import { Characteristics } from '../../components/GoodCharacteristicRedactor'

const GoodRedactorPage: FC<GoodRedactorPageProps> = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_DATA_FOR_GOOD_PAGE, {
        variables: { goodId: Number(id) },
    })

    if (loading) return <Loader page />
    if (error) return <p>Error :(</p>

    const good: IGood = data.good
    const characteristics: ICharacteristics = data.goodCharacteristics

    return (
        <GoodContext.Provider value={good}>
            <div className={styles.GoodRedactorPage}>
                <div className={styles.GoodRedactorPage__container}>
                    <Photo />
                    <Description />
                    <Price />
                    <Characteristics characteristics={characteristics} />
                </div>
            </div>
        </GoodContext.Provider>
    )
}

export default GoodRedactorPage
