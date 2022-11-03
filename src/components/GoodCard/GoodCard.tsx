import classNames from 'classnames'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button/Button'
import Rating from '../UI/Rating/Rating'
import styles from './GoodCard.module.scss'
import GoodCardProps from './GoodCard.props'

const NO_PHOTO =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'

//TODO: Разделить на два компонента
const GoodCard: FC<GoodCardProps> = ({ data, isFull, className }) => {
    const {
        main_photo,
        name,
        sub_type_goods,
        brands,
        current_price,
        description,
        id,
    } = data

    if (!isFull)
        return (
            <div
                className={classNames(
                    styles.GoodCard,
                    className ? className : ''
                )}
            >
                <div className={styles.GoodCard__container}>
                    <img
                        src={main_photo ? main_photo.photo : NO_PHOTO}
                        alt={name}
                        className={styles.GoodCard__photo}
                    />

                    <div className={styles.GoodCard__nameContainer}>
                        <div className={styles.GoodCard__line}>
                            <div className={styles.GoodCard__type}>
                                {sub_type_goods.name}
                            </div>
                            <div className={styles.GoodCard__brand}>
                                {brands.name}
                            </div>
                        </div>
                        <Link
                            to={`/good/${id}`}
                            className={styles.GoodCard__name}
                        >
                            {name}
                        </Link>
                        <div className={styles.FullGoodCard__rating}>
                            <Rating
                                type='mini'
                                rating={4}
                                revNum={10}
                            />
                        </div>
                    </div>

                    <div className={styles.GoodCard__price}>
                        {current_price.discount !== null ? (
                            <>
                                <div className={styles.FullGoodCard__priceMain}>
                                    {current_price.discount}
                                </div>
                                <div
                                    className={styles.FullGoodCard__priceSecond}
                                >
                                    {current_price.price}
                                </div>
                            </>
                        ) : (
                            <div className={styles.FullGoodCard__priceMain}>
                                {current_price.price}
                            </div>
                        )}
                    </div>
                    <Button secondary>Add to Cart</Button>
                </div>
            </div>
        )
    else
        return (
            <div className={styles.FullGoodCard}>
                <div className={styles.FullGoodCard__container}>
                    <div className={styles.FullGoodCard__photoContainer}>
                        <img
                            src={main_photo ? main_photo.photo : NO_PHOTO}
                            alt={name}
                            className={styles.FullGoodCard__photo}
                        />
                    </div>

                    <div className={styles.FullGoodCard__infoContainer}>
                        <div className={styles.FullGoodCard__info}>
                            <Link
                                to={`/good/${id}`}
                                className={styles.FullGoodCard__name}
                            >
                                {name}
                            </Link>
                            <div className={styles.FullGoodCard__rating}>
                                <Rating
                                    type='mini'
                                    rating={4}
                                    revNum={10}
                                />
                            </div>
                            <div className={styles.FullGoodCard__description}>
                                {description}
                            </div>
                            <div className={styles.FullGoodCard__price}>
                                {current_price.discount !== null ? (
                                    <>
                                        <div
                                            className={
                                                styles.FullGoodCard__priceMain
                                            }
                                        >
                                            {current_price.discount}
                                        </div>
                                        <div
                                            className={
                                                styles.FullGoodCard__priceSecond
                                            }
                                        >
                                            {current_price.price}
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className={
                                            styles.FullGoodCard__priceMain
                                        }
                                    >
                                        {current_price.price}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.FullGoodCard__inputsContainer}>
                            <Button secondary>Add to cart</Button>
                            <Button secondary>Buy now</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default GoodCard
