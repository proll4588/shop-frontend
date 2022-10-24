import classNames from 'classnames'
import React, { FC, useState } from 'react'
import styles from './GoodPage.module.scss'
import GoodPageProps from './GoodPage.props'

const myphoto1 =
    'https://sun9-north.userapi.com/sun9-86/s/v1/ig2/rPDHsKOlqqeARET1kIHJRRmvanmc0bEL25MgcrZPLc9Imc4e12UYVqnp261utIdnni8qkC14xDq4Tf3FJ6yQo4fJ.jpg?size=1080x1080&quality=96&type=album'

const myphoto2 =
    'https://sun9-west.userapi.com/sun9-1/s/v1/ig2/rqOZx35-xPoiFsw7-336I4jjoMWNK42V15RTg-WYU2vj_tvCqrZ--X0ti3rqqMLXY9r8sQ9BqQkXQ8u2FnBSuvIk.jpg?size=1080x1080&quality=96&type=album'

const GoodDescription = () => {
    return (
        <div className={styles.GoodDescription}>
            <div className={styles.GoodDescription__container}>description</div>
        </div>
    )
}

interface GoodPhotoProps {
    photos: string[]
}
const GoodPhoto: FC<GoodPhotoProps> = ({ photos }) => {
    const photoList = photos.map((p, i) => ({ id: i, photo: p }))
    const [selectedPhoto, setSelectedPhoto] = useState(photoList[0])

    return (
        <div className={styles.GoodPhoto}>
            <div className={styles.GoodPhoto__container}>
                <img
                    className={styles.GoodPhoto__photo}
                    src={selectedPhoto.photo}
                    alt='photo1'
                />

                <ul className={styles.GoodPhoto__photoList}>
                    {photoList.map((photo) => {
                        return (
                            <li className={styles.GoodPhoto__listElement}>
                                <img
                                    className={classNames(
                                        styles.GoodPhoto__photoElement,
                                        photo.id === selectedPhoto.id
                                            ? styles.GoodPhoto__photoElement_active
                                            : ''
                                    )}
                                    key={photo.id}
                                    src={photo.photo}
                                    alt='p1'
                                    // onMouseEnter={() => {
                                    //     setSelectedPhoto(photo)
                                    // }}
                                    onClick={() => {
                                        setSelectedPhoto(photo)
                                    }}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

const FullGoodInfo: FC = () => {
    return (
        <div className={styles.FullGoodInfo}>
            <div className={styles.FullGoodInfo__container}>
                <GoodPhoto
                    photos={[
                        myphoto1,
                        myphoto2,
                        myphoto1,
                        myphoto2,
                        myphoto1,
                        myphoto2,
                        myphoto1,
                        myphoto2,
                        myphoto1,
                        myphoto2,
                    ]}
                />
                <GoodDescription />
            </div>
        </div>
    )
}

const GoodPage: FC<GoodPageProps> = () => {
    return (
        <div className={styles.GoodPage}>
            <div className={styles.GoodPage__container}>
                <FullGoodInfo />
            </div>
        </div>
    )
}

export default GoodPage
