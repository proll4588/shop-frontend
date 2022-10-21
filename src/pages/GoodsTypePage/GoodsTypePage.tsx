import React, { FC, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './GoodsTypePage.module.scss'
import GoodsTypePageProps from './GoodsTypePage.props'
import { GET_ALL_GOODS_TYPES } from '../../apollo/fetchs'
import { useQuery } from '@apollo/client'
import GoodsTypeList from '../../components/GoodsTypeList/GoodsTypeList'
import { useSetRecoilState } from 'recoil'

enum TypesType {
    global = 'global',
    local = 'local',
    sub = 'sub',
}

const GoodsTypePage: FC<GoodsTypePageProps> = () => {
    const urlParams = useParams()
    const { loading, error, data } = useQuery(GET_ALL_GOODS_TYPES)
    const [dataType, setDataType] = useState([])

    const [type, setType] = useState<TypesType>(null)

    useLayoutEffect(() => {
        const isGlobalTypes = 'globalGoodsTypeId' in urlParams
        const isLocalTypes = 'localGoodsTypeId' in urlParams

        if (!isGlobalTypes && !isLocalTypes) {
            setType(TypesType.global)
        } else if (isGlobalTypes && !isLocalTypes) {
            setType(TypesType.local)
        } else if (isGlobalTypes && isLocalTypes) {
            setType(TypesType.sub)
        }
    }, [urlParams])

    useLayoutEffect(() => {
        if (data) {
            if (type === TypesType.global) {
                setDataType(
                    data.types.map((el) => {
                        return {
                            id: el.id,
                            name: el.name,
                            photo: el.photo,
                            href: `${el.id}`,
                        }
                    })
                )
            } else if (type === TypesType.local) {
                const glob = data.types.find(
                    (el) => el.id === Number(urlParams.globalGoodsTypeId)
                )
                setDataType(
                    glob.localGoodsTypes.map((el) => {
                        return {
                            id: el.id,
                            name: el.name,
                            photo: el.photo,
                            href: `${el.id}`,
                        }
                    })
                )
            } else if (type === TypesType.sub) {
                const glob = data.types.find(
                    (el) => el.id === Number(urlParams.globalGoodsTypeId)
                )
                const loc = glob.localGoodsTypes.find(
                    (el) => el.id === Number(urlParams.localGoodsTypeId)
                )
                setDataType(
                    loc.subGoodsTypes.map((el) => {
                        return {
                            id: el.id,
                            name: el.name,
                            photo: el.photo,
                            href: `${el.id}`,
                        }
                    })
                )
            }
        }
    }, [type, data])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div className={styles.GoodsTypePage}>
            <div className={styles.GoodsTypePage__container}>
                {type}
                <GoodsTypeList data={dataType} />
            </div>
        </div>
    )
}

export default GoodsTypePage
