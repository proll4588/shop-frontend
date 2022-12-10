import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import React, { FC, useLayoutEffect, useState } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { GET_ALL_GOODS_TYPES, IGetAllGoodsTypes } from '../../apollo/fetchs'
import {
    IGlobalGoodsTypes,
    ILocalGoodsTypes,
} from '../../interfaces/goodsTypes.interface'
import styles from './TypePage.module.scss'
import TypePageProps from './TypePage.props'

/*============================================*/
interface TypeNameProps {
    name: string
}
const TypeName: FC<TypeNameProps> = ({ name }) => {
    const nameList = name.split(',')

    return (
        <div className={styles.TypeName}>
            <h5 className={styles.TypeName__mainName}>{nameList[0]}</h5>
            <ul className={styles.TypeName__nameList}>
                {nameList.slice(1).map((el, index) => (
                    <li
                        className={styles.TypeName__nameListElement}
                        key={index}
                    >
                        {el}
                    </li>
                ))}
            </ul>
        </div>
    )
}

interface GlobalTypesListProps {
    types: IGlobalGoodsTypes[]
    activeTypeId: number
    onTypeClick: (globalType: IGlobalGoodsTypes) => void
}
const GlobalTypesList: FC<GlobalTypesListProps> = ({
    types,
    activeTypeId,
    onTypeClick,
}) => {
    const clickHandler = (type) => {
        onTypeClick(type)
    }

    return (
        <div className={styles.GlobalTypesList}>
            <div className={styles.GlobalTypesList__container}>
                <h5 className={styles.GlobalTypesList__head}>
                    <AiOutlineUnorderedList
                        className={styles.GlobalTypesList__listIcon}
                    />
                    Категории
                </h5>
                <ul className={styles.GlobalTypesList__list}>
                    {types.map((type) => (
                        <li
                            className={styles.GlobalTypesList__listElement}
                            key={type.id}
                            onClick={() => {
                                clickHandler(type)
                            }}
                        >
                            <TypeName name={type.name} />
                            <MdOutlineKeyboardArrowRight
                                className={classNames(
                                    styles.GlobalTypesList__arrowIcon,
                                    activeTypeId === type.id
                                        ? styles.GlobalTypesList__arrowIcon_active
                                        : ''
                                )}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
/*============================================*/

interface GoodTypeListProps {
    localTypes: ILocalGoodsTypes[]
}
const GoodTypeList: FC<GoodTypeListProps> = ({ localTypes }) => {
    return (
        <div className={styles.GoodTypeList}>
            <div className={styles.GoodTypeList__container}>
                <ul className={styles.GoodTypeList__localList}>
                    {localTypes.map((localType) => (
                        <li
                            className={styles.GoodTypeList__localListElement}
                            key={localType.id}
                        >
                            <h4
                                className={
                                    styles.GoodTypeList__localListElementName
                                }
                            >
                                {localType.name}
                            </h4>

                            <ul className={styles.GoodTypeList__subList}>
                                {localType.sub_type_goods.map((sub) => (
                                    <li
                                        className={
                                            styles.GoodTypeList__subListElement
                                        }
                                        key={sub.id}
                                    >
                                        <Link
                                            to={`/goods/${sub.id}`}
                                            className={
                                                styles.GoodTypeList__subListElementName
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.GoodTypeList__subListElementName
                                                }
                                            >
                                                {sub.name}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const TypePage: FC<TypePageProps> = () => {
    const [activeGlobalType, setActiveGlobalType] =
        useState<IGlobalGoodsTypes>(null)

    const { loading, error, data } =
        useQuery<IGetAllGoodsTypes>(GET_ALL_GOODS_TYPES)

    useLayoutEffect(() => {
        !!data && setActiveGlobalType(data.types[0])
    }, [data])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{JSON.stringify(error)}</p>
    const { types } = data

    return (
        <div className={styles.TypePage}>
            <div className={styles.TypePage__container}>
                <GlobalTypesList
                    types={types}
                    activeTypeId={!!activeGlobalType && activeGlobalType.id}
                    onTypeClick={setActiveGlobalType}
                />
                {!!activeGlobalType && (
                    <GoodTypeList
                        localTypes={activeGlobalType.local_type_goods}
                    />
                )}
            </div>
        </div>
    )
}

export default TypePage
