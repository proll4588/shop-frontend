import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { GET_GOODS } from '../../apollo/fetchs'
import InputGoodsParams from '../../components/ControlComponents/InputGoodsParams/InputGoodsParams'
import styles from './GoodRedactorPage.module.scss'
import GoodRedactorPageProps from './GoodRedactorPage.props'

const params = [
    { id: 1, name: 'type', type: 'choise', info: { from: 'sub_type_goods' } },
    { id: 2, name: 'name', type: 'text' },
    { id: 3, name: 'description', type: 'text' },
    { id: 4, name: 'photo', type: 'text' },
    { id: 5, name: 'price', type: 'price' },
    { id: 6, name: 'brand', type: 'choise', info: { from: 'brands' } },
]

const GoodRedactorPage: FC<GoodRedactorPageProps> = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_GOODS, {
        variables: { id: Number(id) },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    console.log(data)

    return (
        <div className={styles.GoodRedactorPage}>
            <div className={styles.GoodRedactorPage__container}>
                GoodRedactorPage Component {id}
                {/* <InputGoodsParams type='choise' />
                <InputGoodsParams type='price' /> */}
                {/* <InputGoodsParams type='text' /> */}
            </div>
        </div>
    )
}

export default GoodRedactorPage
