import { Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import useStart from '../hooks/start.hook'
import AccountPage from '../pages/AccountPage/AccountPage'
import AuthPage from '../pages/AuthPage/AuthPage'
import CartPage from '../pages/CartPage/CartPage'
import GoodPage from '../pages/GoodPage/GoodPage'
import GoodsPage from '../pages/GoodsPage/GoodsPage'
import TypePage from '../pages/TypePage/TypePage'
import styles from './ShopLayout.module.scss'

/*
 * Компонент ShopLayout - это layout для магазинной части приложения
 */
const ShopLayout = () => {
    const { error, isInit } = useStart()

    if (error) return <>Oops)</>
    if (!isInit) return <>Loading</>

    return (
        <div className={styles.ShopLayout}>
            <div className={styles.ShopLayout__container}>
                <div className={styles.ShopLayout__content}>
                    {' '}
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

                <Footer />
            </div>
        </div>
    )
}

export default ShopLayout
