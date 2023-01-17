import React, { FC, useEffect, useState } from 'react'
import styles from './TypesRedactor.module.scss'
import TypesRedactorProps from './TypesRedactor.props'
import { useMutation, useQuery } from '@apollo/client'
import {
    CREATE_GLOBAL_TYPE,
    CREATE_LOCAL_TYPE,
    CREATE_SUB_TYPE,
    DELETE_GLOBAL_TYPE,
    DELETE_LOCAL_TYPE,
    DELETE_SUB_TYPE,
    FIND_GLOBAL_TYPES,
    FIND_LOCAL_TYPES,
    GET_ALL_GOODS_TYPES,
    TYPE_PATH,
    UPDATE_GLOBAL_TYPE,
    UPDATE_LOCAL_TYPE,
    UPDATE_SUB_TYPE,
    UPDATE_SUB_TYPE_PHOTO,
} from '../../apollo/fetchs'
import {
    IGlobalGoodsTypes,
    ILocalGoodsTypes,
    ISubGoodsTypes,
} from '../../interfaces/goodsTypes.interface'
import MyPopup from '../../components/MyPopup/MyPopup'
import { LabelInput } from '../../components/LabelInput'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import MyCombobox from '../../components/UI/MyCombobox/MyCombobox'
import { MdDeleteForever } from 'react-icons/md'

interface GlobalListProps {
    types: IGlobalGoodsTypes[]
}
const GlobalList: FC<GlobalListProps> = ({ types }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [element, setElement] = useState(null)

    const [del, delData] = useMutation(DELETE_GLOBAL_TYPE, {
        refetchQueries: [{ query: GET_ALL_GOODS_TYPES }],
    })

    const deleteType = (id) => del({ variables: { globalTypeId: id } })

    const open = (el) => {
        setIsOpen(true)
        setElement(el)
    }
    const close = () => {
        setIsOpen(false)
        setElement(null)
    }

    return (
        <div className={styles.GlobalList}>
            <ul className={styles.GlobalList__container}>
                {types.map((el) => (
                    <li
                        key={el.id}
                        className={styles.GlobalList__element}
                    >
                        <div className={styles.GlobalList__top}>
                            <h4
                                className={styles.GlobalList__name}
                                onClick={() => {
                                    open(el)
                                }}
                            >
                                {el.name}
                            </h4>
                            <MdDeleteForever
                                className={styles.GlobalList__delIcon}
                                onClick={() => {
                                    deleteType(el.id)
                                }}
                            />
                        </div>

                        <LocalList types={el.local_type_goods} />
                    </li>
                ))}
            </ul>

            {isOpen && (
                <GlobalTypeRedactorPopup
                    close={close}
                    isOpen={isOpen}
                    type={element}
                />
            )}
        </div>
    )
}

interface LocalListProps {
    types: ILocalGoodsTypes[]
}
const LocalList: FC<LocalListProps> = ({ types }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [element, setElement] = useState(null)

    const [del, delData] = useMutation(DELETE_LOCAL_TYPE, {
        refetchQueries: [{ query: GET_ALL_GOODS_TYPES }],
    })

    const deleteType = (id) => del({ variables: { localTypeId: id } })

    const open = (el) => {
        setIsOpen(true)
        setElement(el)
    }
    const close = () => {
        setIsOpen(false)
        setElement(null)
    }

    return (
        <div className={styles.LocalList}>
            <ul className={styles.LocalList__container}>
                {types.map((el) => (
                    <li
                        key={el.id}
                        className={styles.LocalList__element}
                    >
                        <div className={styles.LocalList__top}>
                            <h5
                                className={styles.LocalList__name}
                                onClick={() => {
                                    open(el)
                                }}
                            >
                                {el.name}
                            </h5>
                            <MdDeleteForever
                                className={styles.LocalList__delIcon}
                                onClick={() => {
                                    deleteType(el.id)
                                }}
                            />
                        </div>

                        <SubList types={el.sub_type_goods} />
                    </li>
                ))}
            </ul>

            {isOpen && (
                <LocalTypeRedactorPopup
                    close={close}
                    isOpen={isOpen}
                    type={element}
                />
            )}
        </div>
    )
}

interface SubListProps {
    types: ISubGoodsTypes[]
}
const SubList: FC<SubListProps> = ({ types }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [element, setElement] = useState(null)

    const [del, delData] = useMutation(DELETE_SUB_TYPE, {
        refetchQueries: [{ query: GET_ALL_GOODS_TYPES }],
    })

    const deleteType = (id) => del({ variables: { subTypeId: id } })

    const open = (el) => {
        setIsOpen(true)
        setElement(el)
    }
    const close = () => {
        setIsOpen(false)
        setElement(null)
    }

    return (
        <div className={styles.SubList}>
            <ul className={styles.SubList__container}>
                {types.map((el) => (
                    <li
                        key={el.id}
                        className={styles.SubList__element}
                    >
                        <div className={styles.SubList__top}>
                            <div
                                className={styles.SubList__name}
                                onClick={() => {
                                    open(el)
                                }}
                            >
                                {el.name}
                            </div>
                            <MdDeleteForever
                                className={styles.SubList__delIcon}
                                onClick={() => {
                                    deleteType(el.id)
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {isOpen && (
                <SubTypeRedactorPopup
                    close={close}
                    isOpen={isOpen}
                    type={element}
                />
            )}
        </div>
    )
}

interface GlobalTypeRedactorPopupProps {
    close: () => void
    isOpen: boolean
    type: IGlobalGoodsTypes
}
const GlobalTypeRedactorPopup: FC<GlobalTypeRedactorPopupProps> = ({
    close,
    isOpen,
    type,
}) => {
    const [value, setValue] = useState(type.name)

    const [updateName, { data, error, loading }] = useMutation(
        UPDATE_GLOBAL_TYPE,
        { refetchQueries: [{ query: GET_ALL_GOODS_TYPES }] }
    )

    const update = () => {
        updateName({
            variables: {
                globalTypeId: type.id,
                name: value,
            },
        })
    }

    useEffect(() => {
        if (data) close()
    }, [data])

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Изменеие глобального типа'
        >
            <LabelInput label='Наименование глобального типа'>
                <input
                    type='text'
                    placeholder='Наименование глобального типа'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </LabelInput>

            {loading ? (
                <Loader />
            ) : (
                <Button
                    onClick={update}
                    disable={type.name === value}
                >
                    Изменить
                </Button>
            )}
        </MyPopup>
    )
}

interface LocalTypeRedactorPopupProps {
    close: () => void
    isOpen: boolean
    type: ILocalGoodsTypes
}
const LocalTypeRedactorPopup: FC<LocalTypeRedactorPopupProps> = ({
    close,
    isOpen,
    type,
}) => {
    const [value, setValue] = useState(type.name)

    const [updateName, { data, error, loading }] = useMutation(
        UPDATE_LOCAL_TYPE,
        { refetchQueries: [{ query: GET_ALL_GOODS_TYPES }] }
    )

    const update = () => {
        updateName({
            variables: {
                localTypeId: type.id,
                name: value,
            },
        })
    }

    useEffect(() => {
        if (data) close()
    }, [data])

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Изменеие локального типа'
        >
            <LabelInput label='Наименование локального типа'>
                <input
                    type='text'
                    placeholder='Наименование локального типа'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </LabelInput>

            {loading ? (
                <Loader />
            ) : (
                <Button
                    onClick={update}
                    disable={type.name === value}
                >
                    Изменить
                </Button>
            )}
        </MyPopup>
    )
}

interface SubTypeRedactorPopupProps {
    close: () => void
    isOpen: boolean
    type: ILocalGoodsTypes
}
const SubTypeRedactorPopup: FC<SubTypeRedactorPopupProps> = ({
    close,
    isOpen,
    type,
}) => {
    const [value, setValue] = useState(type.name)

    const [updateName, { data, error, loading }] = useMutation(
        UPDATE_SUB_TYPE,
        { refetchQueries: [{ query: GET_ALL_GOODS_TYPES }] }
    )

    const [uploadPhoto, uploadData] = useMutation(UPDATE_SUB_TYPE_PHOTO, {
        refetchQueries: [{ query: GET_ALL_GOODS_TYPES }],
    })

    const updatePhoto = (file) =>
        uploadPhoto({ variables: { file, subTypeId: type.id } })

    const update = () => {
        updateName({
            variables: {
                subTypeId: type.id,
                name: value,
            },
        })
    }

    useEffect(() => {
        if (data) close()
    }, [data])

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Изменеие типа'
        >
            <LabelInput label='Наименование типа'>
                <input
                    type='text'
                    placeholder='Наименование типа'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </LabelInput>

            <LabelInput label='Загрузка фото'>
                <PhotoUploader
                    onDrop={updatePhoto}
                    isDroped={uploadData.data ? true : false}
                    photo={type.photo}
                />
            </LabelInput>

            {loading ? (
                <Loader />
            ) : (
                <Button
                    onClick={update}
                    disable={type.name === value}
                >
                    Изменить
                </Button>
            )}
        </MyPopup>
    )
}

interface PhotoUploaderProps {
    onDrop?: (file: any) => void
    isDroped?: boolean
    photo?: string
}
const PhotoUploader: FC<PhotoUploaderProps> = ({ isDroped, onDrop, photo }) => {
    return (
        <Dropzone
            onDrop={([file]) => onDrop(file)}
            accept={{
                'image/jpeg': [],
                'image/png': [],
            }}
        >
            {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                    {...getRootProps({
                        className: styles.OtherPhotoDrag,
                    })}
                >
                    <input {...getInputProps()} />
                    <div
                        className={classNames(
                            styles.OtherPhotoDrag__container,
                            isDragActive
                                ? styles.OtherPhotoDrag__container_active
                                : ''
                        )}
                    >
                        {!!photo && (
                            <img
                                className={styles.OtherPhotoDrag__photo}
                                src={TYPE_PATH + photo}
                                alt='123'
                            />
                        )}
                        <div className={styles.OtherPhotoDrag__add}>
                            {isDroped ? <>ok</> : <>+</>}
                        </div>
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

interface GlobalCreatorPopupProps {
    close: () => void
    isOpen: boolean
}
const GlobalCreatorPopup: FC<GlobalCreatorPopupProps> = ({ close, isOpen }) => {
    const [name, setName] = useState('')

    const [create, createData] = useMutation(CREATE_GLOBAL_TYPE, {
        refetchQueries: [{ query: GET_ALL_GOODS_TYPES }],
    })

    useEffect(() => {
        if (createData.data) close()
    }, [createData.data])

    const clickHandler = () => {
        if (!!name.length) create({ variables: { name } })
    }

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание характеристики'
        >
            <LabelInput label='Имя глобального типа'>
                <input
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </LabelInput>
            {createData.loading ? (
                <Loader />
            ) : (
                <Button
                    onClick={clickHandler}
                    disable={!name.length}
                >
                    Добавить
                </Button>
            )}
        </MyPopup>
    )
}

interface GlobalTypesComboboxProps {
    onChange?: (id: number) => void
}
const GlobalTypesCombobox: FC<GlobalTypesComboboxProps> = ({ onChange }) => {
    const [query, setQuery] = useState('')

    const { data, error, loading } = useQuery(FIND_GLOBAL_TYPES, {
        variables: { search: query },
    })

    const types = data ? data.findGlobalType : []

    return (
        <div className={styles.GlobalTypesCombobox}>
            <MyCombobox
                elements={types}
                onQuering={setQuery}
                onSelect={onChange}
                loading={loading || !!error}
                // canBeNull
                nullValue='Выберети тип'
            />
        </div>
    )
}

interface LocalCreatorPopupProps {
    close: () => void
    isOpen: boolean
}
const LocalCreatorPopup: FC<LocalCreatorPopupProps> = ({ close, isOpen }) => {
    const [name, setName] = useState('')
    const [globalId, setGlobalId] = useState(null)

    const [create, createData] = useMutation(CREATE_LOCAL_TYPE, {
        refetchQueries: [{ query: GET_ALL_GOODS_TYPES }],
    })

    useEffect(() => {
        if (createData.data) close()
    }, [createData.data])

    const clickHandler = () => {
        if (!!name.length)
            create({ variables: { name, globalTypeId: Number(globalId) } })
    }

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание типа'
        >
            <LabelInput label='Имя локального типа'>
                <input
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </LabelInput>

            <LabelInput label='Глобальный тип'>
                <GlobalTypesCombobox onChange={setGlobalId} />
            </LabelInput>

            {createData.loading ? (
                <Loader />
            ) : (
                <Button
                    onClick={clickHandler}
                    disable={!name.length || globalId === -1}
                >
                    Добавить
                </Button>
            )}
        </MyPopup>
    )
}

interface LocalTypesComboboxProps {
    onChange?: (id: number) => void
}
export const LocalTypesCombobox: FC<LocalTypesComboboxProps> = ({
    onChange,
}) => {
    const [query, setQuery] = useState('')

    const { data, error, loading } = useQuery(FIND_LOCAL_TYPES, {
        variables: { search: query },
    })

    const types = data ? data.findLocalType : []

    return (
        <div className={styles.LocalTypesCombobox}>
            <MyCombobox
                elements={types}
                onQuering={setQuery}
                onSelect={onChange}
                loading={loading || !!error}
            />
        </div>
    )
}

interface SubCreatorPopupProps {
    close: () => void
    isOpen: boolean
}
const SubCreatorPopup: FC<SubCreatorPopupProps> = ({ close, isOpen }) => {
    const [name, setName] = useState('')
    const [localId, setLocalId] = useState(null)

    const [create, createData] = useMutation(CREATE_SUB_TYPE, {
        refetchQueries: [{ query: GET_ALL_GOODS_TYPES }],
    })

    useEffect(() => {
        if (createData.data) close()
    }, [createData.data])

    const clickHandler = () => {
        if (!!name.length)
            create({ variables: { name, localTypeId: Number(localId) } })
    }

    return (
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание типа'
        >
            <LabelInput label='Имя подтипа'>
                <input
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </LabelInput>

            <LabelInput label='Локальный тип'>
                <LocalTypesCombobox onChange={setLocalId} />
            </LabelInput>

            {createData.loading ? (
                <Loader />
            ) : (
                <Button
                    onClick={clickHandler}
                    disable={!name.length || localId === -1}
                >
                    Добавить
                </Button>
            )}
        </MyPopup>
    )
}

interface TypeAdderProps {}
const TypeAdder: FC<TypeAdderProps> = () => {
    const [isOpenGlobal, setIsOpenGlobal] = useState(false)
    const [isOpenLocal, setIsOpenLocal] = useState(false)
    const [isOpenSub, setIsOpenSub] = useState(false)

    const openGlobal = () => setIsOpenGlobal(true)
    const closeGlobal = () => setIsOpenGlobal(false)

    const openLocal = () => setIsOpenLocal(true)
    const closeLocal = () => setIsOpenLocal(false)

    const openSub = () => setIsOpenSub(true)
    const closeSub = () => setIsOpenSub(false)

    return (
        <div className={styles.TypeAdder}>
            <h3 className={styles.TypeAdder__title}>Добавление</h3>
            <div className={styles.TypeAdder__container}>
                <Button onClick={openGlobal}>Глобальный тип</Button>
                <Button onClick={openLocal}>Локальный тип</Button>
                <Button onClick={openSub}>Подтип</Button>

                {isOpenGlobal && (
                    <GlobalCreatorPopup
                        isOpen={isOpenGlobal}
                        close={closeGlobal}
                    />
                )}

                {isOpenLocal && (
                    <LocalCreatorPopup
                        close={closeLocal}
                        isOpen={isOpenLocal}
                    />
                )}

                {isOpenSub && (
                    <SubCreatorPopup
                        close={closeSub}
                        isOpen={isOpenSub}
                    />
                )}
            </div>
        </div>
    )
}

const TypesRedactor: FC<TypesRedactorProps> = () => {
    const { data, error, loading } = useQuery(GET_ALL_GOODS_TYPES)

    return (
        <div className={styles.TypesRedactor}>
            <div className={styles.TypesRedactor__container}>
                <TypeAdder />
                {data ? <GlobalList types={data.types} /> : null}
            </div>
        </div>
    )
}

export default TypesRedactor
