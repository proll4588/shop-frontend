import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    GET_DATA_FOR_GOOD_PAGE,
    IGetDataForGoodPage,
} from '../../apollo/fetchs'
import Button from '../../components/UI/Button/Button'
import Rating from '../../components/UI/Rating/Rating'
import { IGood } from '../../interfaces/good.interface'
import styles from './GoodPage.module.scss'
import GoodPageProps from './GoodPage.props'
import ImageGallery from 'react-image-gallery'
import GoodDescriptionPanel from '../../components/GoodDescriptionPanel/GoodDescriptionPanel'
import FavoriteButton from '../../components/UI/FavoriteButton/FavoriteButton'
import useFavorite from '../../hooks/favorite.hook'

interface GoodDescriptionProps {
    data: IGood
}
const GoodDescription: FC<GoodDescriptionProps> = ({ data }) => {
    const {
        addToFavorite,
        removeFromFavorite,
        data: favoriteList,
    } = useFavorite()
    const { brands, name, sub_type_goods, current_price } = data
    return (
        <div className={styles.GoodDescription}>
            <div className={styles.GoodDescription__container}>
                <div className={styles.GoodDescription__typeName}>
                    {sub_type_goods.name}
                </div>
                <div className={styles.GoodDescription__name}>{name}</div>

                <div className={styles.GoodDescription__brand}>
                    <div className={styles.GoodDescription__brandLeft}>
                        <div className={styles.GoodDescription__brandTitle}>
                            Brand
                        </div>

                        <div className={styles.GoodDescription__brandName}>
                            {brands.name}
                        </div>
                    </div>

                    {brands.logo && (
                        <img
                            alt='123'
                            src={brands.logo}
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
                    {current_price.discount !== null ? (
                        <>
                            <div
                                className={
                                    styles.GoodDescription__priceSecondary
                                }
                            >
                                {current_price.price}
                            </div>
                            <div className={styles.GoodDescription__priceMain}>
                                {current_price.discount}
                            </div>
                        </>
                    ) : (
                        <div className={styles.GoodDescription__priceMain}>
                            {current_price.price}
                        </div>
                    )}
                </div>

                <div className={styles.GoodDescription__actionBar}>
                    <FavoriteButton
                        onClick={(value) => {
                            if (value) addToFavorite(data.id)
                            else removeFromFavorite(data.id)
                        }}
                        value={
                            !!favoriteList &&
                            !!favoriteList.getFavorite.find(
                                (el) => el.goods_catalog_id === data.id
                            )
                        }
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
    const { good, goodCharacteristics } = data

    return (
        <div className={styles.GoodPage}>
            <div className={styles.GoodPage__container}>
                <FullGoodInfo
                    data={good}
                    photos={good.all_photos.map((el) => el.photo)}
                />
                <GoodDescriptionPanel
                    description={good.description}
                    characteristics={goodCharacteristics}
                />
            </div>
        </div>
    )
}

export default GoodPage
