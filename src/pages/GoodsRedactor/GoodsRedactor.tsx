import { useMutation, useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { CREATE_GOOD, GET_GOODS, GOODS_PATH } from '../../apollo/fetchs'
import ControlGoodsList from '../../components/ControlComponents/ControlGoodsList/ControlGoodsList'
import Input from '../../components/UI/Input/Input'
import styles from './GoodsRedactor.module.scss'
import GoodsRedactorProps from './GoodsRedactor.props'
import MyPopup from '../../components/MyPopup/MyPopup'
import { LabelInput } from '../../components/LabelInput'
import Button from '../../components/UI/Button/Button'
import { SubTypesCombobox } from '../../components/GoodDescriptionRedactor'
import Loader from '../../components/UI/Loader/Loader'
import { Link, Navigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import useDebounce from '../../hooks/debounce.hook'
import { IGood } from '../../interfaces/good.interface'

interface GoodsAddPopupProps {
    close: () => void
    isOpen: boolean
    onCreate?: (subId: number, name: string) => void
}
const GoodsAddPopup: FC<GoodsAddPopupProps> = ({ close, isOpen, onCreate }) => {
    const [name, setName] = useState('')
    const [typeId, setTypeId] = useState(null)

    const [create, { loading, error, data }] = useMutation(CREATE_GOOD)

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
            <td>{good.brands.name}</td>
            <td>{good.current_price.price}р</td>
        </tr>
    )
}

const GoodsRedactor: FC<GoodsRedactorProps> = () => {
    const viewCount = 10

    const [search, setSearch] = useState<string | null>('')
    const dbSearch = useDebounce(search)

    const [page, setPage] = useState(1)
    const [cacheCount, setCacheCount] = useState(null)

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

    const nextPage = () => {
        setPage((prev) => prev + 1)
    }
    const prevPage = () => {
        setPage((prev) => prev - 1)
    }

    const goods = data ? data.getGoods.goods : null
    const count = data ? data.getGoods.count : null

    // Кэшируем кол-во заказов
    if (count !== null && count !== cacheCount) setCacheCount(count)

    return (
        <div className={styles.GoodsRedactor}>
            <div className={styles.GoodsRedactor__container}>
                <h3 className={styles.GoodsRedactor__title}>
                    Управление товарами
                </h3>
                <div className={styles.GoodsRedactor__tableHeader}>
                    {/* TODO:Сделать задержку поиска */}
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

                {!loading && !error ? (
                    <>
                        <GoodsTable goods={goods} />
                        <div className={styles.GoodsRedactor__navPanel}>
                            <Button
                                disable={page === 1}
                                onClick={prevPage}
                            >
                                Назад
                            </Button>

                            <div className={styles.GoodsRedactor__navInfo}>
                                {viewCount * (page - 1) + 1} -{' '}
                                {viewCount * page > cacheCount
                                    ? cacheCount
                                    : viewCount * page}{' '}
                                из {cacheCount}
                            </div>

                            <Button
                                disable={viewCount * page >= cacheCount}
                                onClick={nextPage}
                            >
                                Далее
                            </Button>
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

export default GoodsRedactor
