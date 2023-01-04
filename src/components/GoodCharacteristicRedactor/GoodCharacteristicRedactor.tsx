import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './GoodCharacteristicRedactor.module.scss'
import GoodCharacteristicRedactorProps from './GoodCharacteristicRedactor.props'
import {
    ICharacteristicGroup,
    ICharacteristicItem,
    ICharacteristics,
} from '../../interfaces/characteristics.interface'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import {
    ADD_CHARACTERISTIC,
    ADD_CHARACTERISTIC_GROUP,
    ADD_CHARACTERISTIC_LIST,
    ADD_CHARACTERISTIC_VALUE,
    DELETE_GOOD_CHARACTERISTIC,
    GET_CHARACTERISTIC_GROUPS,
    GET_CHARACTERISTIC_LIST,
    GET_CHARACTERISTIC_VALUES,
    GET_DATA_FOR_GOOD_PAGE,
} from '../../apollo/fetchs'
import Button from '../UI/Button/Button'
import { BiTrash } from 'react-icons/bi'
import MyCombobox from '../UI/MyCombobox/MyCombobox'
import CharacteristicsContext from '../../contexts/characteristics.context'
import MyPopup from '../MyPopup/MyPopup'
import { LabelInput } from '../LabelInput'
import GoodContext from '../../contexts/good.context'

interface CharacteristicItemProps {
    characteristicsItem: ICharacteristicItem
}
const CharacteristicItem: FC<CharacteristicItemProps> = ({
    characteristicsItem,
}) => {
    const { id } = useParams()

    const [deleteItem, deelteData] = useMutation(DELETE_GOOD_CHARACTERISTIC, {
        refetchQueries: [
            {
                query: GET_DATA_FOR_GOOD_PAGE,
                variables: { goodId: Number(id) },
            },
        ],
    })

    const del = () => {
        deleteItem({
            variables: {
                goodId: Number(id),
                itemId: characteristicsItem.id,
            },
        })
    }

    return (
        <div className={styles.CharacteristicItem}>
            <Button
                secondary
                className={styles.CharacteristicItem__delBtn}
                onClick={del}
            >
                <BiTrash />
            </Button>
            <div className={styles.CharacteristicItem__name}>
                {characteristicsItem.name}
            </div>
            <div className={styles.CharacteristicItem__param}>
                {characteristicsItem.value}
            </div>
        </div>
    )
}

interface CharacteristicGroupProps {
    characteristicGroup: ICharacteristicGroup
}
const CharacteristicGroup: FC<CharacteristicGroupProps> = ({
    characteristicGroup,
}) => {
    return (
        <div className={styles.CharacteristicGroup}>
            <h3 className={styles.CharacteristicGroup__title}>
                {characteristicGroup.name}
            </h3>

            <ul className={styles.CharacteristicGroup__list}>
                {characteristicGroup.items.map((el) => (
                    <li
                        key={el.id}
                        className={styles.CharacteristicGroup__el}
                    >
                        <CharacteristicItem characteristicsItem={el} />
                    </li>
                ))}
                {/* <li>
                    <Button>
                        <GrAdd />
                    </Button>
                </li> */}
            </ul>
        </div>
    )
}

/*==============================================================*/
/*==============================================================*/

interface CharacteristicGroupsComboboxProps {
    onChange?: (id: number) => void
}
const CharacteristicGroupsCombobox: FC<CharacteristicGroupsComboboxProps> = ({
    onChange,
}) => {
    const { id } = useParams()

    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [defaultVal, setDefaultVal] = useState(null)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const { data, error, loading } = useQuery(GET_CHARACTERISTIC_GROUPS, {
        variables: { goodId: Number(id), search: query },
    })

    const types = data ? data.getCharacteristicGroupsByGoodId : []

    return (
        <div
            className={styles.BrandsCombobox}
            style={{ display: 'flex', gap: 10 }}
        >
            <MyCombobox
                elements={types}
                onQuering={setQuery}
                onSelect={onChange}
                defaultValue={defaultVal ? defaultVal : undefined}
                loading={loading || !!error}
            />

            <Button onClick={open}>+</Button>
            {isOpen && (
                <CharacteristicGroupCreatorPopup
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

interface CharacteristicGroupCreatorPopupProps {
    close: () => void
    isOpen: boolean
    onCreate?: (id: number, name: string) => void
}
const CharacteristicGroupCreatorPopup: FC<
    CharacteristicGroupCreatorPopupProps
> = ({ close, isOpen, onCreate }) => {
    const [name, setName] = useState('')
    const { subId } = useContext(CharacteristicsContext)

    const [createGroup, { data }] = useMutation(ADD_CHARACTERISTIC_GROUP)

    const create = () => {
        if (!!name.length)
            createGroup({
                variables: {
                    subId: subId,
                    name: name,
                },
            })
    }

    useEffect(() => {
        if (data) {
            const { id, name } = data.addCharacteristicGroup
            onCreate && onCreate(id, name)
            close()
        }
    }, [data])

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание группы характеристик'
        >
            <LabelInput label='Наименование группы'>
                <input
                    type='text'
                    placeholder='Наименование группы'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </LabelInput>

            <Button onClick={create}>Создать</Button>
        </MyPopup>
    )
}

/*==============================================================*/
/*==============================================================*/

interface CharacteristicListComboboxProps {
    onChange?: (id: number) => void
}
const CharacteristicListCombobox: FC<CharacteristicListComboboxProps> = ({
    onChange,
}) => {
    const { groupId } = useContext(CharacteristicsContext)

    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [defaultVal, setDefaultVal] = useState(null)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const { data, error, loading } = useQuery(GET_CHARACTERISTIC_LIST, {
        variables: { groupId: groupId, search: query },
    })

    const types = data ? data.getCharacteristicList : []

    return (
        <div
            className={styles.BrandsCombobox}
            style={{ display: 'flex', gap: 10 }}
        >
            <MyCombobox
                elements={types}
                onQuering={setQuery}
                onSelect={onChange}
                defaultValue={defaultVal ? defaultVal : undefined}
                loading={loading || !!error}
            />

            <Button onClick={open}>+</Button>
            {isOpen && (
                <CharacteristicListCreatorPopup
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

interface CharacteristicListCreatorPopupProps {
    close: () => void
    isOpen: boolean
    onCreate?: (id: number, name: string) => void
}
const CharacteristicListCreatorPopup: FC<
    CharacteristicListCreatorPopupProps
> = ({ close, isOpen, onCreate }) => {
    const { groupId } = useContext(CharacteristicsContext)
    const [name, setName] = useState('')

    const [createList, { data }] = useMutation(ADD_CHARACTERISTIC_LIST)

    const create = () => {
        if (!!name.length)
            createList({
                variables: {
                    groupId: Number(groupId),
                    name: name,
                },
            })
    }

    useEffect(() => {
        if (data) {
            const { id, name } = data.addCharacteristicList
            onCreate && onCreate(id, name)
            close()
        }
    }, [data])

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание характеристики'
        >
            <LabelInput label='Наименование характиристики'>
                <input
                    type='text'
                    placeholder='Наименование характиристики'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </LabelInput>

            <Button onClick={create}>Создать</Button>
        </MyPopup>
    )
}

/*==============================================================*/
/*==============================================================*/

interface CharacteristicValueComboboxProps {
    onChange?: (id: number) => void
}
const CharacteristicValueCombobox: FC<CharacteristicValueComboboxProps> = ({
    onChange,
}) => {
    const { listId } = useContext(CharacteristicsContext)

    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [defaultVal, setDefaultVal] = useState(null)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const { data, error, loading } = useQuery(GET_CHARACTERISTIC_VALUES, {
        variables: { listId: listId, search: query },
    })

    const types = data
        ? data.getCharacteristicValues.map((el) => ({
              name: el.value,
              id: el.id,
          }))
        : []

    return (
        <div
            className={styles.BrandsCombobox}
            style={{ display: 'flex', gap: 10 }}
        >
            <MyCombobox
                elements={types}
                onQuering={setQuery}
                onSelect={onChange}
                defaultValue={defaultVal ? defaultVal : undefined}
                loading={loading || !!error}
            />

            <Button onClick={open}>+</Button>
            {isOpen && (
                <CharacteristicValueCreatorPopup
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

interface CharacteristicValueCreatorPopupProps {
    close: () => void
    isOpen: boolean
    onCreate?: (id: number, name: string) => void
}
const CharacteristicValueCreatorPopup: FC<
    CharacteristicValueCreatorPopupProps
> = ({ close, isOpen, onCreate }) => {
    const { listId } = useContext(CharacteristicsContext)
    const [value, setValue] = useState('')

    const [createValue, { data }] = useMutation(ADD_CHARACTERISTIC_VALUE)

    const create = () => {
        if (!!value.length)
            createValue({
                variables: {
                    listId: Number(listId),
                    value: value,
                },
            })
    }

    useEffect(() => {
        if (data) {
            const { id, value } = data.addCharacteristicValue
            onCreate && onCreate(id, value)
            close()
        }
    }, [data])

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание характеристики'
        >
            <LabelInput label='Наименование значения характиристики'>
                <input
                    type='text'
                    placeholder='Наименование значения характиристики'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </LabelInput>

            <Button onClick={create}>Создать</Button>
        </MyPopup>
    )
}

/*==============================================================*/
/*==============================================================*/

const CharacteristicAdder = () => {
    const { id } = useParams()
    const good = useContext(GoodContext)

    const subId = good.sub_type_goods.id
    const [groupId, setGroupId] = useState(null)
    const [listId, setListId] = useState(null)
    const [valueId, setValueId] = useState(null)

    const [creating, setCreating] = useState(false)

    const [add, addData] = useMutation(ADD_CHARACTERISTIC, {
        refetchQueries: [
            {
                query: GET_DATA_FOR_GOOD_PAGE,
                variables: { goodId: Number(id) },
            },
        ],
    })

    useEffect(() => {
        setListId(-1)
        setValueId(-1)
    }, [groupId])

    useEffect(() => {
        setValueId(-1)
    }, [listId])

    const clickHandler = () => {
        add({
            variables: {
                goodId: Number(id),
                listId: listId,
                valueId: valueId,
            },
        })

        setGroupId(-1)
        setCreating(false)
    }

    return (
        <CharacteristicsContext.Provider
            value={{ subId, groupId, listId, valueId }}
        >
            <div className={styles.Characteristics__adder}>
                {creating ? (
                    <>
                        <LabelInput label='Группа характеристик'>
                            <CharacteristicGroupsCombobox
                                onChange={setGroupId}
                            />
                        </LabelInput>

                        {groupId !== null && groupId !== -1 && (
                            <LabelInput label='Характеристика'>
                                <CharacteristicListCombobox
                                    onChange={setListId}
                                />
                            </LabelInput>
                        )}

                        {listId !== null && listId !== -1 && (
                            <LabelInput label='Значение'>
                                <CharacteristicValueCombobox
                                    onChange={setValueId}
                                />
                            </LabelInput>
                        )}

                        {groupId !== -1 && listId !== -1 && valueId !== -1 && (
                            <Button
                                secondary
                                onClick={clickHandler}
                            >
                                Добавить
                            </Button>
                        )}
                    </>
                ) : (
                    <Button onClick={() => setCreating(true)}>
                        Добавить характеристику
                    </Button>
                )}
            </div>
        </CharacteristicsContext.Provider>
    )
}

interface CharacteristicsProps {
    characteristics: ICharacteristics
}
export const Characteristics: FC<CharacteristicsProps> = ({
    characteristics,
}) => {
    return (
        <div className={styles.Characteristics}>
            <div className={styles.Characteristics__container}>
                <CharacteristicAdder />

                <div className={styles.Characteristics__viewer}>
                    {characteristics.map((el) => (
                        <CharacteristicGroup
                            characteristicGroup={el}
                            key={el.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

const GoodCharacteristicRedactor: FC<GoodCharacteristicRedactorProps> = ({
    characteristics,
}) => {
    return <Characteristics characteristics={characteristics} />
}

export default GoodCharacteristicRedactor
