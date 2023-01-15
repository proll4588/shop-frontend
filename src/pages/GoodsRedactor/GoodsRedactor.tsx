import { useMutation, useQuery } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import {
    CHANGE_GOOD_STATUS,
    CREATE_GOOD,
    GET_GOODS,
    GOODS_PATH,
} from '../../apollo/fetchs'
import Input from '../../components/UI/Input/Input'
import styles from './GoodsRedactor.module.scss'
import GoodsRedactorProps from './GoodsRedactor.props'
import MyPopup from '../../components/MyPopup/MyPopup'
import { LabelInput } from '../../components/LabelInput'
import Button from '../../components/UI/Button/Button'
import { SubTypesCombobox } from '../../components/GoodDescriptionRedactor'
import Loader from '../../components/UI/Loader/Loader'
import { Link, Navigate } from 'react-router-dom'
import { AiOutlineCheckCircle, AiOutlineSearch } from 'react-icons/ai'
import { VscError } from 'react-icons/vsc'
import useDebounce from '../../hooks/debounce.hook'
import { IGood } from '../../interfaces/good.interface'
import classNames from 'classnames'
import Pagination from '../../components/Pagination/Pagination'

interface GoodsAddPopupProps {
    close: () => void
    isOpen: boolean
    onCreate?: (subId: number, name: string) => void
}
const GoodsAddPopup: FC<GoodsAddPopupProps> = ({ close, isOpen, onCreate }) => {
    const [name, setName] = useState('')
    const [typeId, setTypeId] = useState(null)

    const [create, { loading, error, data }] = useMutation(CREATE_GOOD, {
        refetchQueries: [GET_GOODS],
    })

    const createGood = () => {
        if (!!name.length && typeId !== -1)
            create({ variables: { subId: typeId, name } })
    }

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание товара'
        >
            <LabelInput label='Наименование товара'>
                <input
                    type='text'
                    placeholder='Наименование товара'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </LabelInput>

            <LabelInput label='Тип товара'>
                <SubTypesCombobox onChange={setTypeId} />
            </LabelInput>

            {loading ? (
                <Loader />
            ) : (
                <Button
                    disable={name.length === 0 || typeId === -1}
                    onClick={createGood}
                >
                    Создать
                </Button>
            )}

            {data && <Navigate to={`${data.createGood.id}`} />}
        </MyPopup>
    )
}

interface AddElementProps {}
const AddElement: FC<AddElementProps> = () => {
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <>
            {isOpen && (
                <GoodsAddPopup
                    close={close}
                    isOpen={isOpen}
                />
            )}
            <Button
                className={styles.AddElement}
                onClick={open}
            >
                Добавить товар
            </Button>
        </>
    )
}

interface GoodsTableProps {
    goods: IGood[]
}
const GoodsTable: FC<GoodsTableProps> = ({ goods }) => {
    return (
        <div className={styles.GoodsTable}>
            <div className={styles.GoodsTable__container}>
                <table className={styles.GoodsTable__table}>
                    <tr className={styles.OrderTable__tableHead}>
                        <th>ID</th>
                        <th>Превью</th>
                        <th>Название</th>
                        <th>Производитель</th>
                        <th>Цена</th>
                        <th>В продаже</th>
                    </tr>

                    {goods &&
                        goods.map((good) => (
                            <GoodsTableRaw
                                good={good}
                                key={good.id}
                            />
                        ))}
                </table>
            </div>
        </div>
    )
}

interface GoodsTableRawProps {
    good: IGood
}
const GoodsTableRaw: FC<GoodsTableRawProps> = ({ good }) => {
    /* TODO: Изменяит статус на true только тогда когда
     * у товара есть все нужные атрибуты
     */
    const [change] = useMutation(CHANGE_GOOD_STATUS, {
        // TODO: БАГ, почему-то не работает хотя должно
        /* Мы вручную изменяем состояние отображения товара в кэшэ,
         * чтобы повторно не отпровлять запросы на сервер
         */
        /*
        update: (cache, change) => {
            cache.modify({
                id: cache.identify(change.data.changeGoodStatus),
                fields: {
                    show: change.data.changeGoodStatus.show,
                },
            })
        },
        */

        /* Из-за того что код выше не работает, приходится
         * заного отправлять запросы (((
         */
        refetchQueries: [GET_GOODS],
    })

    // При нажатии на кнопку, отправляется запрос на
    // изменение статуса отображения товара
    const changeStatus = () => {
        change({
            variables: {
                goodId: good.id,
                status: !good.show,
            },
        })
    }

    return (
        <tr className={styles.GoodsTableRaw}>
            <td>{good.id}</td>
            <td>
                <Link to={`/goodsRedactor/${good.id}`}>
                    <div className={styles.GoodsTableRaw__imgContainer}>
                        {good.main_photo && (
                            <img
                                alt='123'
                                src={GOODS_PATH + good.main_photo.photo}
                                className={styles.GoodsTableRaw__img}
                            />
                        )}
                    </div>
                </Link>
            </td>
            <td>
                <Link
                    to={`/goodsRedactor/${good.id}`}
                    className={styles.GoodsTableRaw__link}
                >
                    {good.name}
                </Link>
            </td>
            <td>{good.brands ? good.brands.name : <>-</>}</td>
            <td>
                {good.current_price ? <>{good.current_price.price}p</> : <>-</>}
            </td>
            <td
                onClick={changeStatus}
                style={{ cursor: 'pointer' }}
            >
                {good.show ? (
                    <AiOutlineCheckCircle
                        className={styles.GoodsTableRaw__icon}
                    />
                ) : (
                    <VscError
                        className={classNames(
                            styles.GoodsTableRaw__icon,
                            styles.GoodsTableRaw__icon_error
                        )}
                    />
                )}
            </td>
        </tr>
    )
}

const GoodsRedactor: FC<GoodsRedactorProps> = () => {
    const viewCount = 10

    const [search, setSearch] = useState<string | null>('')
    const dbSearch = useDebounce(search)

    const [page, setPage] = useState(1)

    const { loading, error, data } = useQuery(GET_GOODS, {
        variables: {
            search: dbSearch,
            skip: viewCount * (page - 1),
            take: viewCount,
        },
    })

    const searchHandler = (e) => {
        setSearch(e)
    }

    useEffect(() => {
        setPage(1)
    }, [dbSearch])

    const goods = data ? data.getGoods.goods : null
    const count = data ? data.getGoods.count : null

    return (
        <div className={styles.GoodsRedactor}>
            <div className={styles.GoodsRedactor__container}>
                <h3 className={styles.GoodsRedactor__title}>
                    Управление товарами
                </h3>
                <div className={styles.GoodsRedactor__tableHeader}>
                    <Input
                        onChange={searchHandler}
                        placeholder='Поиск по названию или id товара'
                        value={search}
                        type='text'
                        className={styles.GoodsRedactor__input}
                        icon={<AiOutlineSearch />}
                    />

                    <AddElement />
                </div>

                {!loading ? <GoodsTable goods={goods} /> : <Loader page />}

                <Pagination
                    totalCount={count}
                    onChangePage={setPage}
                    startPage={page}
                />
            </div>
        </div>
    )
}

export default GoodsRedactor
