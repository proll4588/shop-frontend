import React, { FC, useContext, useEffect, useState } from 'react'
import styles from './GoodDescriptionRedactor.module.scss'
import GoodDescriptionRedactorProps from './GoodDescriptionRedactor.props'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import Button from '../UI/Button/Button'
import { useMutation, useQuery } from '@apollo/client'
import {
    CREATE_BRAND,
    GET_BRANDS,
    GET_DATA_FOR_GOOD_PAGE,
    SEARCH_TYPE,
    UPDATE_GOOD_DATA,
    UPLOAD_BRAND_LOGO,
} from '../../apollo/fetchs'
import MyPopup from '../MyPopup/MyPopup'
import { LabelInput } from '../LabelInput'
import MyCombobox from '../UI/MyCombobox/MyCombobox'
import GoodContext from '../../contexts/good.context'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

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
        <MyPopup
            close={close}
            isOpen={isOpen}
            title='Создание нового производителя'
        >
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
        </MyPopup>
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

interface DescriptionProps {}
export const Description: FC<DescriptionProps> = () => {
    const good = useContext(GoodContext)

    // TODO: id с good
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
    // console.log(errors)

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

const GoodDescriptionRedactor: FC<GoodDescriptionRedactorProps> = () => {
    return <Description />
}

export default GoodDescriptionRedactor
