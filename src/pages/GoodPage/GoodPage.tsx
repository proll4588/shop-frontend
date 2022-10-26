import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import {
    GET_DATA_FOR_GOOD_PAGE,
    IGetDataForGoodPage,
} from '../../apollo/fetchs'
import Button from '../../components/UI/Button/Button'
import IconCard from '../../components/UI/IconCard/IconCard'
import Rating from '../../components/UI/Rating/Rating'
import Square from '../../components/UI/Square/Square'
import { IGood } from '../../interfaces/good.interface'
import styles from './GoodPage.module.scss'
import GoodPageProps from './GoodPage.props'
import ImageGallery from 'react-image-gallery'

const myphoto1 =
    'https://sun9-north.userapi.com/sun9-86/s/v1/ig2/rPDHsKOlqqeARET1kIHJRRmvanmc0bEL25MgcrZPLc9Imc4e12UYVqnp261utIdnni8qkC14xDq4Tf3FJ6yQo4fJ.jpg?size=1080x1080&quality=96&type=album'

const myphoto2 =
    'https://sun9-west.userapi.com/sun9-1/s/v1/ig2/rqOZx35-xPoiFsw7-336I4jjoMWNK42V15RTg-WYU2vj_tvCqrZ--X0ti3rqqMLXY9r8sQ9BqQkXQ8u2FnBSuvIk.jpg?size=1080x1080&quality=96&type=album'

interface GoodDescriptionProps {
    data: IGood
}
const GoodDescription: FC<GoodDescriptionProps> = ({ data }) => {
    return (
        <div className={styles.GoodDescription}>
            <div className={styles.GoodDescription__container}>
                <div className={styles.GoodDescription__typeName}>
                    {data.sub_type_goods.name}
                </div>
                <div className={styles.GoodDescription__name}>{data.name}</div>

                <div className={styles.GoodDescription__brand}>
                    <div className={styles.GoodDescription__brandLeft}>
                        <div className={styles.GoodDescription__brandTitle}>
                            Brand
                        </div>

                        <div className={styles.GoodDescription__brandName}>
                            {data.brands.name}
                        </div>
                    </div>

                    {data.brands.logo && (
                        <img
                            alt='123'
                            src={data.brands.logo}
                            className={styles.GoodDescription__brandLogo}
                        />
                    )}
                </div>

                <div className={styles.GoodDescription__rating}>
                    <Rating
                        rating={4}
                        type={'mini'}
                        revNum={15}
                    />
                </div>

                <div className={styles.GoodDescription__price}>
                    {data.current_price.discount !== null ? (
                        <>
                            <div
                                className={
                                    styles.GoodDescription__priceSecondary
                                }
                            >
                                {data.current_price.price}
                            </div>
                            <div className={styles.GoodDescription__priceMain}>
                                {data.current_price.discount}
                            </div>
                        </>
                    ) : (
                        <div className={styles.GoodDescription__priceMain}>
                            {data.current_price.price}
                        </div>
                    )}
                </div>

                <div className={styles.GoodDescription__actionBar}>
                    <Square
                        icon={<AiOutlineHeart />}
                        className={styles.GoodDescription__fav}
                    />
                    <Button className={styles.GoodDescription__button}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}

interface GoodPhotoProps {
    photos: string[]
}
const GoodPhoto: FC<GoodPhotoProps> = ({ photos }) => {
    const photoList = photos.map((p, i) => ({ id: i, photo: p }))
    const photoGallary = photos.map((el) => ({ original: el }))
    const [selectedPhoto, setSelectedPhoto] = useState(photoList[0])

    return (
        <div className={styles.GoodPhoto}>
            <div className={styles.GoodPhoto__container}>
                <ul className={styles.GoodPhoto__photoList}>
                    {!!photoList.length ? (
                        photoList.map((photo) => {
                            return (
                                <li
                                    className={styles.GoodPhoto__listElement}
                                    key={photo.id}
                                >
                                    <img
                                        className={classNames(
                                            styles.GoodPhoto__photoElement,
                                            photo.id === selectedPhoto.id
                                                ? styles.GoodPhoto__photoElement_active
                                                : ''
                                        )}
                                        src={photo.photo}
                                        alt='p1'
                                        onClick={() => {
                                            setSelectedPhoto(photo)
                                        }}
                                    />
                                </li>
                            )
                        })
                    ) : (
                        <li className={styles.GoodPhoto__listElement} />
                    )}
                </ul>

                <div className={styles.GoodPhoto__mainPhotoContainer}>
                    {selectedPhoto !== undefined && (
                        <>
                            <img
                                className={styles.GoodPhoto__photo}
                                src={selectedPhoto.photo}
                                alt='photo1'
                            />
                            <div className={styles.GoodPhoto__gallaryContainer}>
                                <ImageGallery
                                    items={photoGallary}
                                    showThumbnails={false}
                                    swipeThreshold={0}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

interface FullGoodInfoProps {
    data: IGood
    photos: string[]
}
const FullGoodInfo: FC<FullGoodInfoProps> = ({ data, photos }) => {
    return (
        <div className={styles.FullGoodInfo}>
            <div className={styles.FullGoodInfo__container}>
                {/* {!!photos.length && <GoodPhoto photos={photos} />} */}
                <GoodPhoto photos={photos} />
                <GoodDescription data={data} />
            </div>
        </div>
    )
}

const GoodPage: FC<GoodPageProps> = () => {
    const { goodId } = useParams()

    const { loading, error, data } = useQuery<IGetDataForGoodPage>(
        GET_DATA_FOR_GOOD_PAGE,
        {
            variables: {
                goodId: Number(goodId),
            },
        }
    )

    if (error) return <>Error</>
    if (loading) return <>Loading</>
    console.log(data)

    return (
        <div className={styles.GoodPage}>
            <div className={styles.GoodPage__container}>
                <FullGoodInfo
                    data={data.good}
                    photos={data.good.all_photos.map((el) => el.photo)}
                />
            </div>
        </div>
    )
}

export default GoodPage
