import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import GoodPage from '../pages/GoodPage/GoodPage'
import GoodsPage from '../pages/GoodsPage/GoodsPage'
import GoodsTypePage from '../pages/GoodsTypePage/GoodsTypePage'
import MainShopPage from '../pages/MainShopPage/MainShopPage'

const ShopLayout = () => {
    return (
        <div className='ShopLayout'>
            <div className='ShopLayout__container'>
                <Header />

                <Routes>
                    <Route
                        path={'/'}
                        element={<MainShopPage />}
                    />
                    {/* <Route
                        path={'/types/:globalGoodsTypeId'}
                        element={<GoodsTypePage />}
                    />
                    <Route
                        path={'/types/:globalGoodsTypeId/:localGoodsTypeId'}
                        element={<GoodsTypePage />}
                    /> */}
                    <Route
                        path={'/goods/:subGoodsTypeId'}
                        element={<GoodsPage />}
                    />
                    <Route
                        path={'/good/:goodId'}
                        element={<GoodPage />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default ShopLayout
