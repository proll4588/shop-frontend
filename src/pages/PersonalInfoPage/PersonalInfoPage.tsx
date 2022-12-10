import React, { FC, ReactNode } from 'react'
import styles from './PersonalInfoPage.module.scss'
import PersonalInfoPageProps from './PersonalInfoPage.props'
import { Controller, useForm } from 'react-hook-form'
import Dropdown from '../../components/UI/Dropdown/Dropdown'
import Dropzone from 'react-dropzone'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_DATA, UPLOAD_USER_PHOTO } from '../../apollo/fetchs'
import { AiOutlineFileImage } from 'react-icons/ai'
import classNames from 'classnames'

const generateUserDataObj = (data) => {
    let ans = { user: { ...data }, address: undefined }

    ans.user.city = undefined
    ans.user.street = undefined
    ans.user.ZIP = undefined
    ans.user.country = undefined
    ans.user.id = undefined
    ans.user.__typename = undefined

    ans.user.address = undefined

    for (let key in ans.user) {
        if (ans.user[key] === '' || ans.user[key] === undefined)
            delete ans.user[key]
    }

    ans.address = {
        city: data.city,
        street: data.street,
        ZIP: Number(data.ZIP),
        country: data.country,
    }

    for (let key in ans.address) {
        if (ans.address[key] === '' || ans.address[key] === undefined)
            delete ans.address[key]
    }

    return ans
}

interface DragPhotoProps {
    isLight?: boolean
}
const DragPhoto: FC<DragPhotoProps> = ({ isLight = false }) => {
    return (
        <div
            className={classNames(
                styles.DragPhoto,
                isLight ? styles.DragPhoto_active : ''
            )}
        >
            <div className={styles.DragPhoto__container}>
                <div className={styles.DragPhoto__iconContainer}>
                    <AiOutlineFileImage className={styles.DragPhoto__icon} />
                </div>

                <h4 className={styles.DragPhoto__mainText}>
                    Перенесите фото (Drag & Drop)
                </h4>
                <h5 className={styles.DragPhoto__subText}>
                    Файл должен быть формата JPEG или PNG
                </h5>
            </div>
        </div>
    )
}

interface LabelInputProps {
    label: string
    children: ReactNode
}
export const LabelInput: FC<LabelInputProps> = ({ label, children }) => {
    return (
        <div className={styles.LabelInput}>
            <label className={styles.LabelInput__label}>{label}</label>
            {children}
        </div>
    )
}

const PersonalInfoPage: FC<PersonalInfoPageProps> = ({ userData }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...userData,
            ...userData.address,
        },
    })

    const [updateUserData, { error, loading, data }] =
        useMutation(UPDATE_USER_DATA)

    const [uploadUserPhoto, uploadInfo] = useMutation(UPLOAD_USER_PHOTO)

    const onSubmit = (data) => {
        updateUserData({
            variables: {
                data: generateUserDataObj(data),
            },
        })
        console.log(generateUserDataObj(data))
    }
    // console.log(errors)

    return (
        <div className={styles.PersonalInfoPage}>
            <div className={styles.PersonalInfoPage__container}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.PersonalInfoPage__form}
                >
                    <LabelInput label='Имя'>
                        <input
                            type='text'
                            placeholder='Имя'
                            {...register('fname', {
                                maxLength: 80,
                            })}
                        />
                    </LabelInput>

                    <LabelInput label='Фамилия'>
                        <input
                            type='text'
                            placeholder='Фамилия'
                            {...register('lname', {
                                maxLength: 100,
                            })}
                        />
                    </LabelInput>

                    <LabelInput label='Адрес электронной почты'>
                        <input
                            type='text'
                            placeholder='Email'
                            {...register('email', {
                                pattern: /^\S+@\S+$/i,
                            })}
                        />
                    </LabelInput>

                    <LabelInput label='Номер телефона'>
                        <input
                            type='tel'
                            placeholder='Номер телефона'
                            {...register('phone_number', {
                                minLength: 6,
                                maxLength: 12,
                            })}
                        />
                    </LabelInput>

                    <LabelInput label='Дата рождения'>
                        <input
                            type='date'
                            placeholder='Date of Birth'
                            {...register('date_of_birthday')}
                        />
                    </LabelInput>

                    <LabelInput label='Пол'>
                        <Controller
                            name='gender'
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    defaultVal={
                                        userData.gender
                                            ? userData.gender
                                                ? 0
                                                : 1
                                            : undefined
                                    }
                                    placeholder={'Пол'}
                                    content={['Мужской', 'Женский']}
                                    onChange={(value) => {
                                        if (value === 'Мужской')
                                            field.onChange(true)
                                        else if (value === 'Женский')
                                            field.onChange(false)
                                    }}
                                />
                            )}
                        />
                    </LabelInput>

                    <LabelInput label='Адрес'>
                        <input
                            type='text'
                            placeholder='Улица, дом-квартира'
                            {...register('street')}
                        />
                    </LabelInput>

                    <LabelInput label='Почтовый индекс'>
                        <input
                            type='number'
                            placeholder='Почтовый индекс'
                            {...register('ZIP')}
                        />
                    </LabelInput>

                    <LabelInput label='Город'>
                        <input
                            type='text'
                            placeholder='Город'
                            {...register('city')}
                        />
                    </LabelInput>

                    <LabelInput label='Страна'>
                        <input
                            type='text'
                            placeholder='Страна'
                            {...register('country')}
                        />
                    </LabelInput>

                    <input
                        type='submit'
                        disabled={loading}
                    />
                </form>
                <div className={styles.PersonalInfoPage__dragndropContainer}>
                    <LabelInput label='Обноаление фотографии'>
                        <Dropzone
                            onDrop={([file]) =>
                                uploadUserPhoto({ variables: { file } })
                            }
                            accept={{
                                'image/jpeg': [],
                                'image/png': [],
                            }}
                        >
                            {({
                                getRootProps,
                                getInputProps,
                                isDragActive,
                            }) => (
                                <div
                                    {...getRootProps({
                                        className:
                                            styles.PersonalInfoPage__drop,
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <DragPhoto isLight={isDragActive} />
                                </div>
                            )}
                        </Dropzone>
                    </LabelInput>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfoPage
