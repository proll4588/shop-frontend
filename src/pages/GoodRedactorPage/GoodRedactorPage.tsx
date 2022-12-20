import { useMutation, useQuery } from '@apollo/client'
import React, {
    FC,
    HTMLAttributes,
    HTMLInputTypeAttribute,
    useEffect,
    useState,
} from 'react'
import { useParams } from 'react-router-dom'
import {
    ADD_GOOD_PHOTO,
    GET_BRANDS,
    GET_GOOD,
    GOODS_PATH,
    REMOVE_GOOD_PHOTO,
    SET_MAIN_GOOD_PHOTO,
} from '../../apollo/fetchs'
import InputGoodsParams from '../../components/ControlComponents/InputGoodsParams/InputGoodsParams'
import styles from './GoodRedactorPage.module.scss'
import GoodRedactorPageProps from './GoodRedactorPage.props'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import { IGood } from '../../interfaces/good.interface'
import { BiTrashAlt } from 'react-icons/bi'
import { Controller, useForm } from 'react-hook-form'
import { LabelInput } from '../../components/LabelInput'
import MyCombobox from '../../components/UI/MyCombobox/MyCombobox'

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
                { query: GET_GOOD, variables: { goodId: Number(id) } },
            ],
        }
    )

    const [addPhoto, addData] = useMutation(ADD_GOOD_PHOTO, {
        refetchQueries: [
            { query: GET_GOOD, variables: { goodId: Number(id) } },
        ],
    })

    const [removePhoto, removeData] = useMutation(REMOVE_GOOD_PHOTO, {
        refetchQueries: [
            { query: GET_GOOD, variables: { goodId: Number(id) } },
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
        <MyCombobox
            elements={brands}
            onQuering={setQuery}
            onSelect={onChange}
            defaultValue={defaultValue}
            loading={loading || !!error}
        />
    )
}

interface DescriptionProps {
    good: IGood
}
const Description: FC<DescriptionProps> = ({ good }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)
    console.log(errors)

    return (
        <div className={styles.Description}>
            <div className={styles.Description__container}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.Description__form}
                >
                    <LabelInput label='Наименование товара'>
                        <input
                            type='text'
                            placeholder='Наименование товара'
                            defaultValue={good.name}
                            {...register('name', { required: true })}
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

                    <LabelInput label='Описание товара'>
                        <textarea
                            defaultValue={good.description}
                            className={styles.Description__textArea}
                            {...register('description', { required: false })}
                        />
                    </LabelInput>

                    <div className={styles.Description__priceContainer}>
                        <LabelInput label='Цена'>
                            <input
                                type='number'
                                defaultValue={good.current_price.price}
                                {...register('price', { required: true })}
                            />
                        </LabelInput>

                        <LabelInput label='Цена с учётом скидки'>
                            <input
                                type='number'
                                defaultValue={
                                    good.current_price.discount
                                        ? good.current_price.discount
                                        : ''
                                }
                                {...register('discount', { required: false })}
                            />
                        </LabelInput>
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

const GoodRedactorPage: FC<GoodRedactorPageProps> = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_GOOD, {
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
            </div>
        </div>
    )
}

export default GoodRedactorPage
