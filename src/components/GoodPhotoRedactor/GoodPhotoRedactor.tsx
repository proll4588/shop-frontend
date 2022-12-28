import React, { FC, useContext } from 'react'
import styles from './GoodPhotoRedactor.module.scss'
import GoodPhotoRedactorProps from './GoodPhotoRedactor.props'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import GoodContext from '../../contexts/good.context'
import {
    ADD_GOOD_PHOTO,
    GET_DATA_FOR_GOOD_PAGE,
    GOODS_PATH,
    REMOVE_GOOD_PHOTO,
    SET_MAIN_GOOD_PHOTO,
} from '../../apollo/fetchs'
import { useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { BiTrashAlt } from 'react-icons/bi'

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

interface PhotoProps {}
export const Photo: FC<PhotoProps> = () => {
    const { main_photo: mainPhoto, all_photos: otherPhoto } =
        useContext(GoodContext)

    const photoStyle = mainPhoto
        ? {
              background: `url(${
                  GOODS_PATH + mainPhoto.photo
              }) center / contain no-repeat`,
          }
        : {}

    // TODO: id можно и из товара достать
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

const GoodPhotoRedactor: FC<GoodPhotoRedactorProps> = () => {
    return <Photo />
}

export default GoodPhotoRedactor
