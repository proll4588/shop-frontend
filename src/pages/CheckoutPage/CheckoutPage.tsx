import { useQuery } from '@apollo/client'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { GET_CART, GET_USER_DATA } from '../../apollo/fetchs'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import useCart from '../../hooks/cart.hook'
import useOrder, { ORDER_TYPES, PAY_STATUSES } from '../../hooks/order.hook'
import { IGood } from '../../interfaces/good.interface'
import { IUser } from '../../interfaces/user.interface'
import { SammeryLine } from '../CartPage'
import { LabelInput } from '../PersonalInfoPage'
import styles from './CheckoutPage.module.scss'
import CheckoutPageProps from './CheckoutPage.props'

const borderDefault = (e) => {
    e.target.className = ''
}

interface PersonalDetailsProps {
    user: IUser
    register: any
}
const PersonalDetails: FC<PersonalDetailsProps> = ({ user, register }) => {
    return (
        <div className={styles.PersonalDetails}>
            <div className={styles.PersonalDetails__container}>
                <div className={styles.PersonalDetails__inputs}>
                    <LabelInput label='Имя'>
                        <input
                            type='text'
                            placeholder='Иван'
                            disabled={!!(user && user.fname)}
                            {...register('fname', { required: true })}
                            onChange={borderDefault}
                        />
                    </LabelInput>

                    <LabelInput label='Фамилия'>
                        <input
                            type='text'
                            placeholder='Иванов'
                            disabled={!!(user && user.lname)}
                            {...register('lname', { required: true })}
                            onChange={borderDefault}
                        />
                    </LabelInput>

                    <LabelInput label='Адрес электронной почты'>
                        <input
                            type='text'
                            placeholder='email@example.com'
                            disabled={!!(user && user.email)}
                            {...register('email', { required: true })}
                            onChange={borderDefault}
                        />
                    </LabelInput>

                    <LabelInput label='Номер телефона'>
                        <input
                            type='text'
                            placeholder='+7 (123) 456 78-90'
                            disabled={!!(user && user.phone_number)}
                            {...register('phone_number', { required: true })}
                            onChange={borderDefault}
                        />
                    </LabelInput>
                </div>
            </div>
        </div>
    )
}

interface ShippingDetailsProps {
    user: IUser
    register: any
    method: string
    setMethod: any
}
const ShippingDetails: FC<ShippingDetailsProps> = ({
    user,
    register,
    method,
    setMethod,
}) => {
    // const [currnetMethod, setCurrentMethod] = useState(method)

    const methodChange = (e) => {
        // setCurrentMethod(e.target.value)
        setMethod(e.target.value)
    }

    return (
        <div className={styles.ShippingDetails}>
            <div className={styles.ShippingDetails__container}>
                <div className={styles.ShippingDetails__radios}>
                    <label className={styles.ShippingDetails__label}>
                        <input
                            {...register('delivery_method', { required: true })}
                            type='radio'
                            value='pickup'
                            onChange={methodChange}
                            className={styles.ShippingDetails__input}
                        />
                        {'Самовывоз'}
                    </label>
                    <label className={styles.ShippingDetails__label}>
                        <input
                            {...register('delivery_method', { required: true })}
                            type='radio'
                            value='delivery'
                            onChange={methodChange}
                            className={styles.ShippingDetails__input}
                        />
                        {'Доставка на дом'}
                    </label>
                </div>
                {method === 'delivery' && (
                    <div className={styles.ShippingDetails__inputs}>
                        <LabelInput label='Адрес'>
                            <input
                                type='text'
                                placeholder='Улица, дом-квартира'
                                disabled={!!(user && user.address.street)}
                                {...register('street', {
                                    required: method === 'delivery',
                                })}
                            />
                        </LabelInput>

                        <LabelInput label='Почтовый индекс'>
                            <input
                                type='text'
                                placeholder='Почтовый индекс'
                                disabled={!!(user && user.address.ZIP)}
                                {...register('ZIP', {
                                    required: method === 'delivery',
                                })}
                            />
                        </LabelInput>

                        <LabelInput label='Город'>
                            <input
                                type='text'
                                placeholder='Город'
                                disabled={!!(user && user.address.city)}
                                {...register('city', {
                                    required: method === 'delivery',
                                })}
                            />
                        </LabelInput>

                        <LabelInput label='Страна'>
                            <input
                                type='text'
                                placeholder='Страна'
                                disabled={!!(user && user.address.country)}
                                {...register('country', {
                                    required: method === 'delivery',
                                })}
                            />
                        </LabelInput>
                    </div>
                )}
            </div>
        </div>
    )
}

interface PaymentMethodProps {
    register: any

    method: string
    setMethod: any
}
const PaymentMethod: FC<PaymentMethodProps> = ({
    register,
    method,
    setMethod,
}) => {
    // const [currnetMethod, setCurrentMethod] = useState(method)

    const methodChange = (e) => {
        // setCurrentMethod(e.target.value)
        setMethod(e.target.value)
    }

    return (
        <div className={styles.PaymentMethod}>
            <div className={styles.PaymentMethod__container}>
                <div className={styles.PaymentMethod__radios}>
                    <label className={styles.PaymentMethod__label}>
                        <input
                            {...register('payment_method', { required: true })}
                            type='radio'
                            value='whenGet'
                            onChange={methodChange}
                            className={styles.PaymentMethod__input}
                        />
                        {'Картой или наличными при получении'}
                    </label>
                    <label className={styles.PaymentMethod__label}>
                        <input
                            {...register('payment_method', { required: true })}
                            type='radio'
                            value='byCardNow'
                            onChange={methodChange}
                            className={styles.PaymentMethod__input}
                        />
                        {'Оплатить картой сейчас'}
                    </label>
                </div>
                {method === 'byCardNow' && (
                    <div className={styles.PaymentMethod__inputs}>
                        <LabelInput label='Номер карты'>
                            <input
                                type='text'
                                placeholder='0000 0000 0000 0000'
                            />
                        </LabelInput>

                        <LabelInput label='Имя владельца'>
                            <input
                                type='text'
                                placeholder='Иван Иванович'
                            />
                        </LabelInput>

                        <LabelInput label='Срок действия'>
                            <input
                                type='text'
                                placeholder='MM/YY'
                            />
                        </LabelInput>

                        <LabelInput label='CVV/CVC'>
                            <input
                                type='text'
                                placeholder='CVV/CVC'
                            />
                        </LabelInput>
                    </div>
                )}
            </div>
        </div>
    )
}

interface CheckoutPartProps {
    children: ReactNode
    title: string
}
const CheckoutPart: FC<CheckoutPartProps> = ({ children, title }) => {
    return (
        <div className={styles.CheckoutPart}>
            <div className={styles.CheckoutPart__container}>
                <div className={styles.CheckoutPart__title}>{title}</div>
                {children}
            </div>
        </div>
    )
}

interface AllCheckoutInfoProps {
    user: IUser
    paymentMethod: string
    deliveryMethod: string
}
const AllCheckoutInfo: FC<AllCheckoutInfoProps> = ({
    user,
    deliveryMethod,
    paymentMethod,
}) => {
    return (
        <div className={styles.AllCheckoutInfo}>
            <div className={styles.AllCheckoutInfo__container}>
                <div className={styles.AllCheckoutInfo__name}>
                    Имя: {user.fname} {user.lname}
                </div>

                <div className={styles.AllCheckoutInfo__phone}>
                    Номер телефона: {user.phone_number}
                </div>

                <div className={styles.AllCheckoutInfo__email}>
                    Электронная почта: {user.email}
                </div>

                <div className={styles.AllCheckoutInfo__addres}>
                    Полный адрес: {user.address.country}, {user.address.city},{' '}
                    {user.address.street}, {user.address.ZIP}
                </div>

                <div className={styles.AllCheckoutInfo__delivery}>
                    Способ доставки:{' '}
                    {deliveryMethod === 'pickup'
                        ? 'Самовывоз'
                        : 'Доставка на дом'}
                </div>

                <div className={styles.AllCheckoutInfo__payment}>
                    Способ оплаты:{' '}
                    {paymentMethod === 'byCardNow'
                        ? 'Картой'
                        : 'При получении заказа'}
                </div>
            </div>
        </div>
    )
}

interface CheckoutFormProps {
    user: IUser
}
const CheckoutForm: FC<CheckoutFormProps> = ({ user }) => {
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [deliverytMethod, setDeliveryMethod] = useState(null)

    const { createOrder, error, isCreateLoading } = useOrder()
    const { register, handleSubmit, formState, getValues } = useForm({
        defaultValues: {
            ...user,
            ...user.address,
            payment_method: null,
            delivery_method: null,
        },
    })
    const onSubmit = (data) => console.log(data)

    const [step, setStep] = useState(1)
    const nextStep = () => {
        if (step !== 3) setStep((prev) => prev + 1)
    }
    const prevStep = () => {
        if (step !== 1) setStep((prev) => prev - 1)
    }

    const createWithPay = () => {
        createOrder(
            PAY_STATUSES.pay,
            getValues('delivery_method') === 'delivery'
                ? ORDER_TYPES.deliver
                : ORDER_TYPES.fromShop
        )
        setStep(4)
    }
    const createWithoutPage = () => {
        createOrder(
            PAY_STATUSES.notPay,
            getValues('delivery_method') === 'delivery'
                ? ORDER_TYPES.deliver
                : ORDER_TYPES.fromShop
        )
        setStep(4)
    }

    return (
        <div className={styles.CheckoutForm}>
            <form
                className={styles.CheckoutForm__form}
                onSubmit={handleSubmit(onSubmit)}
            >
                {step === 1 && (
                    <CheckoutPart title='Информация о пользователе'>
                        <PersonalDetails
                            user={user}
                            register={register}
                        />
                    </CheckoutPart>
                )}

                {step === 2 && (
                    <CheckoutPart title='Информация о доставке'>
                        <ShippingDetails
                            user={user}
                            register={register}
                            method={deliverytMethod}
                            setMethod={setDeliveryMethod}
                        />
                    </CheckoutPart>
                )}
                {step === 3 && (
                    <CheckoutPart title='Способ оплаты'>
                        <PaymentMethod
                            register={register}
                            method={paymentMethod}
                            setMethod={setPaymentMethod}
                        />
                    </CheckoutPart>
                )}
                {step === 4 && (
                    <CheckoutPart
                        title={
                            isCreateLoading
                                ? 'Оформление...'
                                : error
                                ? 'Что-то пошло не так'
                                : 'Ваш заказ оформлен'
                        }
                    >
                        {isCreateLoading && <Loader />}
                    </CheckoutPart>
                )}

                {step !== 4 && (
                    <div className={styles.CheckoutForm__text}>
                        Если данные представленные в форме не верны или уже не
                        актуальны, то зайдите на{' '}
                        <Link
                            to={'/account/personalInfo'}
                            className={styles.CheckoutForm__link}
                        >
                            страницу пользователя
                        </Link>{' '}
                        и измените их там, потом вернитесь обратно к оформлению
                        заказа
                    </div>
                )}
            </form>
            {step !== 4 && (
                <div className={styles.CheckoutForm__btns}>
                    <Button
                        style={{ opacity: Number(step !== 1) }}
                        onClick={prevStep}
                        disable={step === 1}
                    >
                        Назад
                    </Button>
                    {step !== 3 ? (
                        <Button
                            onClick={nextStep}
                            disable={step === 2 && !deliverytMethod}
                        >
                            Далее
                        </Button>
                    ) : paymentMethod === 'byCardNow' ? (
                        <Button onClick={createWithPay}>
                            Перейти к оплате
                        </Button>
                    ) : (
                        <Button
                            onClick={createWithoutPage}
                            disable={step === 3 && !paymentMethod}
                        >
                            Завершить оформление заказа
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

interface SammeryProps {
    cartInfo: {
        count: number
        goods_catalog: IGood
    }[]
}
export const Sammery: FC<SammeryProps> = ({ cartInfo }) => {
    let subTotal = 0
    let discount = 0
    let total = 0
    let fullCount = 0

    // console.log(cartInfo)

    cartInfo.forEach((cart) => {
        subTotal += cart.count * cart.goods_catalog.current_price.price
        fullCount += cart.count
    })

    cartInfo.forEach((cart) => {
        if (cart.goods_catalog.current_price.discount) {
            discount +=
                cart.count *
                (cart.goods_catalog.current_price.price -
                    cart.goods_catalog.current_price.discount)
        }
    })

    total = subTotal - discount

    return (
        <div className={styles.Sammery}>
            <div className={styles.Sammery__container}>
                <h3 className={styles.Sammery__head}>Сводка</h3>
                <ul className={styles.Sammery__list}>
                    {cartInfo.map((el) => (
                        <li
                            className={styles.Sammery__el}
                            key={el.goods_catalog.id}
                        >
                            <SammeryLine
                                left={el.goods_catalog.name}
                                right={
                                    String(
                                        el.goods_catalog.current_price.price
                                    ) +
                                    '₽' +
                                    ' * ' +
                                    String(el.count)
                                }
                            />
                        </li>
                    ))}
                </ul>
                <div className={styles.Sammery__calc}>
                    <SammeryLine
                        left='Без учёта скидки'
                        right={String(subTotal) + '₽'}
                    />
                    <SammeryLine
                        left='Скидка'
                        right={String(discount) + '₽'}
                    />
                </div>
                <SammeryLine
                    left={`Итог (${fullCount} товаров)`}
                    right={String(total) + '₽'}
                />
            </div>
        </div>
    )
}

// const LastCheckOut = () => {
//     const {createOrder, error, isCreateLoading} = useOrder()

//     return ()
// }

const CheckoutPage: FC<CheckoutPageProps> = () => {
    // TODO: Сделать отдельный хук для пользователя
    const {
        data: userData,
        error: userError,
        loading: userLoading,
    } = useQuery(GET_USER_DATA)

    const { cartList, error: cartError, isGetLoading: cartLoading } = useCart()

    if (userLoading || cartLoading) return <Loader page />
    if (userError || cartError) return <>Error :,{'<'}</>

    const { userData: user } = userData

    return (
        <div className={styles.CheckoutPage}>
            <div className={styles.CheckoutPage__container}>
                <div className={styles.CheckoutPage__left}>
                    <CheckoutForm user={user} />
                </div>

                {cartList.length !== 0 && (
                    <div className={styles.CheckoutPage__right}>
                        <Sammery cartInfo={cartList} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckoutPage
