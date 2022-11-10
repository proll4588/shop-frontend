import { useLazyQuery } from '@apollo/client'
import { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { CHECK_TOKEN } from '../apollo/fetchs'
import tokenAtom from '../atoms/token.atom'
import Header from '../components/Header/Header'
import AccountPage from '../pages/AccountPage/AccountPage'
import AuthPage from '../pages/AuthPage/AuthPage'
import GoodPage from '../pages/GoodPage/GoodPage'
import GoodsPage from '../pages/GoodsPage/GoodsPage'
import MainShopPage from '../pages/MainShopPage/MainShopPage'

/*
 * Компонент ShopLayout - это layout для магазинной части приложения
 */
const ShopLayout = () => {
    const [token, setToken] = useRecoilState(tokenAtom)
    const [verify, { data, loading, error }] = useLazyQuery(CHECK_TOKEN)

    // При первом рендере приложения получаем токен из памяти проложения
    useLayoutEffect(() => {
        if (token && token !== 'null') verify()
    }, [])

    // При получении информации о валидности токена
    useLayoutEffect(() => {
        if (data && !data.verifyToken.verify) {
            setToken(null)
        }
    }, [data])
    // ....

    if (loading) return <>Loading</>
    if (error) return <>Oops)</>

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
                        element={<MainShopPage />}
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
                </Routes>
            </div>
        </div>
    )
}

export default ShopLayout
