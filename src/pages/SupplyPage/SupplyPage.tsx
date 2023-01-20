import React, { FC, useEffect, useState } from 'react'
import styles from './SupplyPage.module.scss'
import SupplyPageProps from './SupplyPage.props'
import MyCombobox from '../../components/UI/MyCombobox/MyCombobox'
import { useMutation, useQuery } from '@apollo/client'
import {
    CREATE_SUPPLIE,
    CREATE_SUPPLIER,
    GET_GOODS,
    GET_SUPPLIERS,
} from '../../apollo/fetchs'
import Button from '../../components/UI/Button/Button'
import MyPopup from '../../components/MyPopup/MyPopup'
import { LabelInput } from '../../components/LabelInput'
import { SearchCombobox } from '../../components/SearchCombobox'

interface SuppliersCreatorPopupProps {
    close: () => void
    isOpen: boolean
    onCreate?: (id: number, name: string) => void
}
const SuppliersCreatorPopup: FC<SuppliersCreatorPopupProps> = ({
    close,
    isOpen,
    onCreate,
}) => {
    const [name, setName] = useState('')
    const [addres, setAddres] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const [createSupplier, { data }] = useMutation(CREATE_SUPPLIER)

    const check = () => {
        return (
            !!name.length && !!addres.length && !!phone.length && !!email.length
        )
    }

    const create = () => {
        if (check())
            createSupplier({
                variables: {
                    name,
                    addres,
                    phone,
                    email,
                },
            })
    }

    useEffect(() => {
        if (data) {
            const { id, name } = data.createSuppliers
            onCreate && onCreate(id, name)
            close()
        }
    }, [data])

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание поставщика'
        >
            <LabelInput label='Имя'>
                <input
                    type='text'
                    placeholder='Имя'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </LabelInput>

            <LabelInput label='Адрес'>
                <input
                    type='text'
                    placeholder='Адрес'
                    value={addres}
                    onChange={(e) => setAddres(e.target.value)}
                />
            </LabelInput>

            <LabelInput label='Номер телефона'>
                <input
                    type='text'
                    placeholder='Номер телефона'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </LabelInput>

            <LabelInput label='Электронная почта'>
                <input
                    type='text'
                    placeholder='Электронная почта'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </LabelInput>

            <Button
                onClick={create}
                disable={!check()}
            >
                Создать
            </Button>
        </MyPopup>
    )
}

interface SuppliersComboboxProps {
    onChange: (id: number) => void
}
const SuppliersCombobox: FC<SuppliersComboboxProps> = ({ onChange }) => {
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [defaultVal, setDefaultVal] = useState(null)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const { data, loading, error } = useQuery(GET_SUPPLIERS, {
        variables: {
            search: query,
        },
    })

    const suppliers = data ? data.getSuppliers : []

    return (
        <div
            className={styles.SuppliersCombobox}
            style={{ display: 'flex', gap: 10 }}
        >
            <MyCombobox
                elements={suppliers}
                onQuering={setQuery}
                onSelect={onChange}
                defaultValue={defaultVal ? defaultVal : undefined}
                loading={loading || !!error}
                placeholder='Выберите поставщика'
            />

            <Button onClick={open}>+</Button>
            {isOpen && (
                <SuppliersCreatorPopup
                    close={close}
                    isOpen={isOpen}
                    onCreate={(id, name) => {
                        setDefaultVal({ id, name })
                    }}
                />
            )}
        </div>
    )
}

interface GoodsComboboxProps {
    onSelect?: (id: number, name: string) => void
}
const GoodsCombobox: FC<GoodsComboboxProps> = ({ onSelect }) => {
    const [query, setQuery] = useState('')

    const { data, error, loading } = useQuery(GET_GOODS, {
        variables: {
            search: query,
            take: 5,
        },
    })

    return (
        <MyCombobox
            elements={data ? data.getGoods.goods : []}
            onQuering={setQuery}
            onSelect={(id) => {
                const good = data
                    ? data.getGoods.goods.find((el) => el.id === id) || {
                          name: '',
                      }
                    : { name: '' }
                onSelect(id, good.name)
            }}
            loading={loading || !!error}
            placeholder='Выберите товар'
            disableButton
        />
    )
}

interface AdderGoodPopupProps {
    close: () => void
    isOpen: boolean
    onCreate?: (id: number, count: number) => void
}
const AdderGoodPopup: FC<AdderGoodPopupProps> = ({
    close,
    isOpen,
    onCreate,
}) => {
    const [good, setGood] = useState(null)
    const [count, setCount] = useState(1)

    const changeCount = (e) => {
        const value = e.target.value
        if (value > 0) setCount(value)
    }

    const create = () => {
        if (good !== null && good.id !== -1) onCreate(good, count)
        close()
    }

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Добавление товара в поставку'
        >
            <LabelInput label='Товар'>
                <GoodsCombobox
                    onSelect={(id, name) => {
                        setGood({ id, name })
                    }}
                />
            </LabelInput>
            <LabelInput label='Кол-во'>
                <input
                    type='number'
                    placeholder='Кол-во'
                    value={count}
                    onChange={changeCount}
                />
            </LabelInput>
            <Button
                onClick={create}
                disable={good === null || good.id === -1}
            >
                Добавить
            </Button>
        </MyPopup>
    )
}

interface CreateSupplyTableProps {
    supId: number
    onCreateSupply?: () => void
}
const CreateSupplyTable: FC<CreateSupplyTableProps> = ({
    supId,
    onCreateSupply,
}) => {
    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const [createSup] = useMutation(CREATE_SUPPLIE)

    const create = () => {
        createSup({
            variables: {
                supId: supId,
                supData: data.map((el) => ({
                    goodId: el.id,
                    count: Number(el.count),
                })),
            },
        })
        onCreateSupply && onCreateSupply()
    }

    const addGood = (good, count) => {
        setData((prev) => [...prev, { id: good.id, name: good.name, count }])
    }

    return (
        <div className={styles.CreateSupplyTable}>
            <div className={styles.CreateSupplyTable__container}>
                <div className={styles.CreateSupplyTable__head}>
                    <Button onClick={open}>Добавить товар</Button>
                    <Button
                        disable={!data.length}
                        secondary
                        onClick={create}
                    >
                        Оформить поставку
                    </Button>
                    {isOpen && (
                        <AdderGoodPopup
                            close={close}
                            isOpen={isOpen}
                            onCreate={addGood}
                        />
                    )}
                </div>
                <div className={styles.CreateSupplyTable__tableContainer}>
                    <table className={styles.CreateSupplyTable__table}>
                        <tr className={styles.CreateSupplyTable__tableHeadRaw}>
                            <th>ID товара</th>
                            <th>Имя товара</th>
                            <th>Кол-во</th>
                        </tr>
                        {!!data.length &&
                            data.map((el) => (
                                <tr
                                    className={
                                        styles.CreateSupplyTable__tableRaw
                                    }
                                >
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.count}</td>
                                </tr>
                            ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

interface SupplieCreatePopupProps {
    close: () => void
    isOpen: boolean
    onCreate?: (id: number) => void
}

const SupplieCreatePopup: FC<SupplieCreatePopupProps> = ({
    close,
    isOpen,
    onCreate,
}) => {
    const [supId, setSupId] = useState(null)

    const create = () => {
        onCreate(supId)
        close()
    }

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание поставки'
        >
            <LabelInput label='Поставщик'>
                <SuppliersCombobox onChange={setSupId} />
            </LabelInput>
            <Button
                disable={supId === -1 || supId === null}
                onClick={create}
            >
                Создать
            </Button>
        </MyPopup>
    )
}

const SupplyPage: FC<SupplyPageProps> = () => {
    const [supId, setSupId] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <div className={styles.SupplyPage}>
            {supId !== null && supId !== -1 ? (
                <div className={styles.SupplyPage__container}>
                    <CreateSupplyTable
                        supId={supId}
                        onCreateSupply={() => {
                            setSupId(null)
                        }}
                    />
                </div>
            ) : (
                <div className={styles.SupplyPage__center}>
                    <Button
                        large
                        onClick={open}
                    >
                        Создать поставку
                    </Button>
                    {isOpen && (
                        <SupplieCreatePopup
                            close={close}
                            isOpen={isOpen}
                            onCreate={setSupId}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default SupplyPage
