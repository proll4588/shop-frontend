import { useMutation, useQuery } from '@apollo/client'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    ADD_GOOD_PHOTO,
    CREATE_BRAND,
    GET_BRANDS,
    GET_DATA_FOR_GOOD_PAGE,
    GET_GOOD,
    GOODS_PATH,
    REMOVE_GOOD_PHOTO,
    SEARCH_TYPE,
    SET_MAIN_GOOD_PHOTO,
    UPDATE_GOOD_DATA,
    UPDATE_GOOD_PRICE,
    UPLOAD_BRAND_LOGO,
} from '../../apollo/fetchs'
import styles from './GoodRedactorPage.module.scss'
import GoodRedactorPageProps from './GoodRedactorPage.props'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import { IGood } from '../../interfaces/good.interface'
import { BiTrashAlt } from 'react-icons/bi'
import { Controller, useForm } from 'react-hook-form'
import { LabelInput } from '../../components/LabelInput'
import MyCombobox from '../../components/UI/MyCombobox/MyCombobox'
import Button from '../../components/UI/Button/Button'
import { Dialog, Transition } from '@headlessui/react'
import {
    AreaChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

interface OtherPhotoProps {
    photo: {
        id: number
        photo: string
    }
    onDelete: () => void
}
const OtherPhoto: FC<OtherPhotoProps> = ({ photo, onDelete }) => {
    return (
        <div className={styles.OtherPhoto}>
            <div className={styles.OtherPhoto__container}>
                <img
                    src={GOODS_PATH + photo.photo}
                    alt={String(photo.id)}
                    className={styles.OtherPhoto__photo}
                />
                <div
                    className={styles.OtherPhoto__del}
                    onClick={() => onDelete()}
                >
                    <BiTrashAlt className={styles.OtherPhoto__icon} />
                </div>
            </div>
        </div>
    )
}

interface OtherPhotoDragProps {
    onDrop: (file: any) => void
}
const OtherPhotoDrag: FC<OtherPhotoDragProps> = ({ onDrop }) => {
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
                        +
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

interface MainPhotoDragProps {
    onDrop: (file: any) => void
}
const MainPhotoDrag: FC<MainPhotoDragProps> = ({ onDrop }) => {
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
                        className: styles.MainPhotoDrag,
                    })}
                >
                    <input {...getInputProps()} />
                    <div
                        className={classNames(
                            styles.MainPhotoDrag__container,
                            isDragActive
                                ? styles.MainPhotoDrag__container_active
                                : ''
                        )}
                    >
                        +
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

interface PhotoProps {
    mainPhoto?: {
        id: number
        photo: string
    }
    otherPhoto?: {
        id: number
        photo: string
    }[]
}
const Photo: FC<PhotoProps> = ({ mainPhoto, otherPhoto }) => {
    const photoStyle = mainPhoto
        ? {
              background: `url(${
                  GOODS_PATH + mainPhoto.photo
              }) center / contain no-repeat`,
          }
        : {}

    const { id } = useParams()

    const [setPhoto, { data, error, loading }] = useMutation(
        SET_MAIN_GOOD_PHOTO,
        {
            refetchQueries: [
                {
                    query: GET_DATA_FOR_GOOD_PAGE,
                    variables: { goodId: Number(id) },
                },
            ],
        }
    )

    const [addPhoto, addData] = useMutation(ADD_GOOD_PHOTO, {
        refetchQueries: [
            {
                query: GET_DATA_FOR_GOOD_PAGE,
                variables: { goodId: Number(id) },
            },
        ],
    })

    const [removePhoto, removeData] = useMutation(REMOVE_GOOD_PHOTO, {
        refetchQueries: [
            {
                query: GET_DATA_FOR_GOOD_PAGE,
                variables: { goodId: Number(id) },
            },
        ],
    })

    return (
        <div className={styles.Photo}>
            <div className={styles.Photo__container}>
                <div
                    className={styles.Photo__mainPhotoContainer}
                    style={mainPhoto ? photoStyle : {}}
                >
                    <MainPhotoDrag
                        onDrop={(file) =>
                            setPhoto({
                                variables: { goodId: Number(id), file },
                            })
                        }
                    />
                </div>
                <div className={styles.Photo__allPhotoContainer}>
                    <OtherPhotoDrag
                        onDrop={(file) =>
                            addPhoto({
                                variables: { goodId: Number(id), file },
                            })
                        }
                    />
                    {!!otherPhoto &&
                        otherPhoto.length !== 0 &&
                        otherPhoto.map((el) => (
                            <OtherPhoto
                                key={el.id}
                                photo={el}
                                onDelete={() =>
                                    removePhoto({
                                        variables: { photoId: el.id },
                                    })
                                }
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

interface LogoUploaderProps {
    onDrop?: (file: any) => void
    isDroped?: boolean
}
const LogoUploader: FC<LogoUploaderProps> = ({ onDrop, isDroped }) => {
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
                        {isDroped ? <>ok</> : <>+</>}
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

const BrandCreatorBtn = () => {
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return (
        <>
            <Button
                secondary
                onClick={open}
            >
                +
            </Button>

            {isOpen && (
                <BrandCreaterPopup
                    close={close}
                    isOpen={isOpen}
                />
            )}
        </>
    )
}

interface BrandCreaterPopupProps {
    close: () => void
    isOpen: boolean
}
const BrandCreaterPopup: FC<BrandCreaterPopupProps> = ({ close, isOpen }) => {
    const [name, setName] = useState('')

    const [uploadLogo, uploadData] = useMutation(UPLOAD_BRAND_LOGO)
    const [createBrand, createData] = useMutation(CREATE_BRAND)

    const dropLogo = (file) => uploadLogo({ variables: { file } })
    const create = () => {
        if (name.length)
            createBrand({
                variables: {
                    name,
                    logo:
                        uploadData.data && uploadData.data.uploadLogoForNewBrand
                            ? uploadData.data.uploadLogoForNewBrand
                            : undefined,
                },
            })
    }

    useEffect(() => {
        if (createData.data) close()
    }, [createData])

    return (
        <Dialog
            onClose={close}
            open={isOpen}
            as='div'
            className={styles.BrandCreaterPopup__dialog}
        >
            {/* <Transition.Child as={Fragment}> */}
            <div className={styles.BrandCreaterPopup__back} />
            {/* </Transition.Child> */}

            <div className={styles.BrandCreaterPopup__dialogContent}>
                {/* <Transition.Child as={Fragment}> */}
                <Dialog.Panel className={styles.BrandCreaterPopup__dialogPanel}>
                    <Dialog.Title
                        as='h4'
                        className={styles.BrandCreaterPopup__dialogTitle}
                    >
                        Создание нового производителя
                    </Dialog.Title>

                    <LabelInput label='Имя производителя'>
                        <input
                            type='text'
                            placeholder='Имя производителя'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </LabelInput>

                    <LogoUploader
                        isDroped={uploadData.data ? true : false}
                        onDrop={dropLogo}
                    />

                    <Button onClick={create}>Создать</Button>
                </Dialog.Panel>
                {/* </Transition.Child> */}
            </div>
        </Dialog>
    )
}

interface BrandsComboboxProps {
    defaultValue?: {
        id: number
        name: string
    }
    onChange?: (id: number) => void
}
const BrandsCombobox: FC<BrandsComboboxProps> = ({
    defaultValue,
    onChange,
}) => {
    const [query, setQuery] = useState('')

    const { data, error, loading } = useQuery(GET_BRANDS, {
        variables: { search: query },
    })

    const brands = data ? data.getBrands : []
    return (
        <div className={styles.BrandsCombobox}>
            <MyCombobox
                elements={brands}
                onQuering={setQuery}
                onSelect={onChange}
                defaultValue={defaultValue}
                loading={loading || !!error}
            />
            {/* <BrandCreaterPopup /> */}
            <BrandCreatorBtn />
        </div>
    )
}

interface SubTypesComboboxProps {
    defaultValue?: {
        id: number
        name: string
    }
    onChange?: (id: number) => void
}
const SubTypesCombobox: FC<SubTypesComboboxProps> = ({
    defaultValue,
    onChange,
}) => {
    const [query, setQuery] = useState('')

    const { data, error, loading } = useQuery(SEARCH_TYPE, {
        variables: { search: query },
    })

    const types = data ? data.getGoodTypesBySearch : []

    return (
        <div className={styles.BrandsCombobox}>
            <MyCombobox
                elements={types}
                onQuering={setQuery}
                onSelect={onChange}
                defaultValue={defaultValue}
                loading={loading || !!error}
            />
        </div>
    )
}

interface DescriptionProps {
    good: IGood
}
const Description: FC<DescriptionProps> = ({ good }) => {
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()
    const [update, updateData] = useMutation(UPDATE_GOOD_DATA, {
        refetchQueries: [
            {
                query: GET_DATA_FOR_GOOD_PAGE,
                variables: { goodId: Number(id) },
            },
        ],
    })

    const onSubmit = (data) => {
        update({
            variables: {
                goodId: Number(id),
                name: data.name === good.name ? undefined : data.name,
                subTypeId:
                    data.subTypeId === good.sub_type_goods.id
                        ? undefined
                        : Number(data.subTypeId),
                brandId:
                    data.brandId === good.brands.id
                        ? undefined
                        : Number(data.brandId),
                description:
                    data.description === good.description
                        ? undefined
                        : data.description,
            },
        })
    }
    console.log(errors)

    return (
        <div className={styles.Description}>
            <div className={styles.Description__container}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.Description__form}
                >
                    <div className={styles.Description__formContainer}>
                        <div className={styles.Description__left}>
                            <LabelInput label='Наименование товара'>
                                <input
                                    type='text'
                                    placeholder='Наименование товара'
                                    defaultValue={good.name}
                                    {...register('name', { required: true })}
                                />
                            </LabelInput>

                            <LabelInput label='Тип товара'>
                                <Controller
                                    name='subTypeId'
                                    control={control}
                                    render={({ field }) => (
                                        <SubTypesCombobox
                                            defaultValue={good.sub_type_goods}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    defaultValue={good.brands.id}
                                />
                            </LabelInput>

                            <LabelInput label='Производитель'>
                                <Controller
                                    name='brandId'
                                    control={control}
                                    render={({ field }) => (
                                        <BrandsCombobox
                                            defaultValue={good.brands}
                                            onChange={field.onChange}
                                        />
                                    )}
                                    defaultValue={good.brands.id}
                                />
                            </LabelInput>
                        </div>
                        <div className={styles.Description__right}>
                            <LabelInput label='Описание товара'>
                                <textarea
                                    defaultValue={good.description}
                                    className={styles.Description__textArea}
                                    {...register('description', {
                                        required: false,
                                    })}
                                />
                            </LabelInput>
                        </div>
                    </div>
                    <input
                        type='submit'
                        value={'Применить изменения'}
                    />
                </form>
            </div>
        </div>
    )
}

interface PriceChartProps {
    allPrices: {
        date: string
        price: number
        discount?: number
    }[]
}
const PriceChart: FC<PriceChartProps> = ({ allPrices }) => {
    const data = allPrices.map((el) => {
        const date = new Date(el.date)
        const dateStr =
            date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate()
        const price = el.discount || el.price

        return { date: dateStr, price: price }
    })

    return (
        <ResponsiveContainer
            width={'100%'}
            height={'100%'}
        >
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type='monotone'
                    dataKey='price'
                    stroke='#8884d8'
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

interface PriceProps {
    currentPrice: {
        date: string
        price: number
        discount?: number
    }
    allPrices: {
        date: string
        price: number
        discount?: number
    }[]
}
const Price: FC<PriceProps> = ({ allPrices, currentPrice }) => {
    const { id } = useParams()

    const [price, setPrice] = useState(String(currentPrice.price))
    const [discount, setDiscount] = useState(
        currentPrice.discount ? String(currentPrice.discount) : ''
    )

    const [updatePrice, updateData] = useMutation(UPDATE_GOOD_PRICE, {
        refetchQueries: [
            {
                query: GET_DATA_FOR_GOOD_PAGE,
                variables: { goodId: Number(id) },
            },
        ],
    })

    const priceChangeHandler = (e) => {
        setPrice(e.target.value)
    }

    const discountChangeHandler = (e) => {
        setDiscount(e.target.value)
    }

    const change = () => {
        updatePrice({
            variables: {
                goodId: Number(id),
                price: Number(price),
                discount: discount.length === 0 ? undefined : Number(discount),
            },
        })
    }

    return (
        <div className={styles.Price}>
            <div className={styles.Price__container}>
                <div className={styles.Price__left}>
                    <LabelInput label='Цена'>
                        <input
                            type='number'
                            value={price}
                            onChange={priceChangeHandler}
                        />
                    </LabelInput>

                    <LabelInput label='Цена с учётом скидки'>
                        <input
                            type='number'
                            value={discount}
                            onChange={discountChangeHandler}
                        />
                    </LabelInput>
                </div>
                <div className={styles.Price__right}>
                    <PriceChart allPrices={allPrices} />
                </div>
            </div>
            <Button
                secondary
                className={styles.Price__btn}
                onClick={change}
            >
                Изменить цену
            </Button>
        </div>
    )
}

const GoodRedactorPage: FC<GoodRedactorPageProps> = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_DATA_FOR_GOOD_PAGE, {
        variables: { goodId: Number(id) },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    const good: IGood = data.good
    // console.log(data)

    return (
        <div className={styles.GoodRedactorPage}>
            <div className={styles.GoodRedactorPage__container}>
                <Photo
                    mainPhoto={good.main_photo}
                    otherPhoto={good.all_photos}
                />
                <Description good={good} />
                <Price
                    allPrices={good.all_prices}
                    currentPrice={good.current_price}
                />
            </div>
        </div>
    )
}

export default GoodRedactorPage
