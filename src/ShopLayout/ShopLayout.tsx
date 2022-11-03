import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import AuthPage from '../pages/AuthPage/AuthPage'
import GoodPage from '../pages/GoodPage/GoodPage'
import GoodsPage from '../pages/GoodsPage/GoodsPage'
import MainShopPage from '../pages/MainShopPage/MainShopPage'

/*
 * Компонент ShopLayout - это layout для магазинной части приложения
 */
const ShopLayout = () => {
    return (
        <div className='ShopLayout'>
            <div className='ShopLayout__container'>
                {/* <Header /> */}

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
                </Routes>
            </div>
        </div>
    )
}

export default ShopLayout
