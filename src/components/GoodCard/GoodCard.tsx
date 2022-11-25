import classNames from 'classnames'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import tokenAtom from '../../atoms/token.atom'
import useCart from '../../hooks/cart.hook'
import useFavorite from '../../hooks/favorite.hook'
import Button from '../UI/Button/Button'
import FavoriteButton from '../UI/FavoriteButton/FavoriteButton'
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
        avg_rating,
    } = data

    const {
        addToFavorite,
        removeFromFavorite,
        data: favoriteList,
    } = useFavorite()

    const token = useRecoilValue(tokenAtom)
    const isAuth = token && token !== 'null'

    const { addToCart, data: cartList } = useCart()

    const doFaveorite = (value) => {
        value ? addToFavorite(id) : removeFromFavorite(id)
    }

    const addToCartFun = () => {
        addToCart(id, 1)
    }

    const isFavorite =
        !!favoriteList && !!favoriteList.getFavorite.find((el) => el.id === id)

    const inCart =
        !!cartList &&
        !!cartList.getCart.find((el) => el.goods_catalog.id === id)

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
                                rating={avg_rating.avg}
                                revNum={avg_rating.count}
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
                    <div className={styles.GoodCard__btns}>
                        <FavoriteButton
                            value={isFavorite}
                            onClick={doFaveorite}
                            disable={!isAuth}
                        />

                        {inCart ? (
                            <Button
                                secondary
                                className={styles.GoodCard__btn}
                                disable
                            >
                                In cart
                            </Button>
                        ) : (
                            <Button
                                secondary
                                className={styles.GoodCard__btn}
                                onClick={addToCartFun}
                                disable={!isAuth}
                            >
                                Add to Cart
                            </Button>
                        )}
                    </div>
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
                                    rating={avg_rating.avg}
                                    revNum={avg_rating.count}
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
                            <FavoriteButton
                                value={isFavorite}
                                onClick={doFaveorite}
                                disable={!isAuth}
                            />
                            {inCart ? (
                                <Button
                                    secondary
                                    className={styles.GoodCard__btn}
                                    disable
                                >
                                    In cart
                                </Button>
                            ) : (
                                <Button
                                    secondary
                                    className={styles.GoodCard__btn}
                                    onClick={addToCartFun}
                                    disable={!isAuth}
                                >
                                    Add to Cart
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default GoodCard
