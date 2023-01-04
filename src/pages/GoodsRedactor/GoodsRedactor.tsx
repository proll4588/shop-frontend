import { useMutation, useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import { CREATE_GOOD, GET_GOODS } from '../../apollo/fetchs'
import ControlGoodsList from '../../components/ControlComponents/ControlGoodsList/ControlGoodsList'
import Input from '../../components/UI/Input/Input'
import styles from './GoodsRedactor.module.scss'
import GoodsRedactorProps from './GoodsRedactor.props'
import MyPopup from '../../components/MyPopup/MyPopup'
import { LabelInput } from '../../components/LabelInput'
import Button from '../../components/UI/Button/Button'
import { SubTypesCombobox } from '../../components/GoodDescriptionRedactor'
import Loader from '../../components/UI/Loader/Loader'
import { Navigate } from 'react-router-dom'

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

interface AddElementProps {
    onClick: () => void
}
const AddElement: FC<AddElementProps> = ({ onClick }) => {
    return (
        <Button
            className={styles.AddElement}
            onClick={onClick}
        >
            Добавить новый товар
        </Button>
    )
}

const GoodsRedactor: FC<GoodsRedactorProps> = () => {
    const [search, setSearch] = useState<string | null>('')
    const { loading, error, data } = useQuery(GET_GOODS, {
        variables: {
            search: search,
        },
    })

    const [isOpen, setIsOpen] = useState(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const searchHandler = (e) => {
        setSearch(e)
    }

    if (data) console.log(data)

    return (
        <div className={styles.GoodsRedactor}>
            <div className={styles.GoodsRedactor__container}>
                {/* TODO:Сделать задержку поиска */}
                <Input
                    onChange={searchHandler}
                    placeholder='Поиск по названию или id товара'
                    value={search}
                    type='text'
                />
                {!loading && !error && !!data.getGoods.length ? (
                    <ControlGoodsList data={data.getGoods} />
                ) : (
                    ''
                )}
                <AddElement onClick={open} />
                {isOpen && (
                    <GoodsAddPopup
                        close={close}
                        isOpen={isOpen}
                    />
                )}
            </div>
        </div>
    )
}

export default GoodsRedactor
