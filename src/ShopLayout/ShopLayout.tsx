import { useLazyQuery } from '@apollo/client'
import { useLayoutEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { CHECK_TOKEN, GET_START_DATA } from '../apollo/fetchs'
import countsAtom from '../atoms/counts.atom'
import tokenAtom from '../atoms/token.atom'
import Header from '../components/Header/Header'
import AccountPage from '../pages/AccountPage/AccountPage'
import AuthPage from '../pages/AuthPage/AuthPage'
import CartPage from '../pages/CartPage/CartPage'
import GoodPage from '../pages/GoodPage/GoodPage'
import GoodsPage from '../pages/GoodsPage/GoodsPage'
import TypePage from '../pages/TypePage/TypePage'

/*
 * Компонент ShopLayout - это layout для магазинной части приложения
 */
const ShopLayout = () => {
    const [token, setToken] = useRecoilState(tokenAtom)
    const setCounts = useSetRecoilState(countsAtom)
    // const [counts, setCounts] = useRecoilState(countsAtom)

    const [verified, setVerified] = useState(false)
    const [verify, { data, loading, error }] = useLazyQuery(CHECK_TOKEN)

    const [geted, setGeted] = useState(false)
    const [getSatrtData, fetinfo] = useLazyQuery(GET_START_DATA)

    // При первом рендере приложения получаем токен из памяти проложения
    useLayoutEffect(() => {
        if (token && token !== 'null') verify()
        else setVerified(true)
    }, [])

    // При получении информации о валидности токена
    useLayoutEffect(() => {
        if (data && !data.verifyToken.verify) {
            setToken(null)
        }
        setVerified(true)
    }, [data])

    // После получения информации о валидности токена
    useLayoutEffect(() => {
        if (verified) {
            if (token) {
                getSatrtData()
            } else {
                setGeted(true)
            }
        }
    }, [verified])

    // При получении стартовых данных
    useLayoutEffect(() => {
        if (fetinfo.data) {
            setCounts({
                cart: fetinfo.data.getCartCount,
                favorite: fetinfo.data.getFavoriteCount,
            })

            setGeted(true)
        }
    }, [fetinfo.data])
    // ....

    if (loading || fetinfo.loading) return <>Loading</>
    if (error || fetinfo.error) return <>Oops)</>
    if (!geted || !verified) return <>Loading</>

    return (
        <div className='ShopLayout'>
            <div className='ShopLayout__container'>
                <Header />

                {/* TODO: Суда можно вставить route компонент */}

                {/* TODO: Сделать оболочку для контента со всеми отступами */}
                <Routes>
                    {/* Главная станица магазина */}
                    <Route
                        path={'/'}
                        element={<TypePage />}
                    />

                    {/* Список товаров по типу */}
                    <Route
                        path={'/goods/:subGoodsTypeId'}
                        element={<GoodsPage />}
                    />

                    {/* Страницв товара */}
                    <Route
                        path={'/good/:goodId'}
                        element={<GoodPage />}
                    />

                    {/* Авторизация пользователя */}
                    <Route
                        path={'/auth'}
                        element={<AuthPage />}
                    />

                    {/* Авторизация пользователя */}
                    <Route
                        path={'/account/*'}
                        element={<AccountPage />}
                    />

                    <Route
                        path={'/cart'}
                        element={<CartPage />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default ShopLayout
