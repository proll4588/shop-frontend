// import { useQuery } from '@apollo/client'
// import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header/Header'
import GoodsPage from '../pages/GoodsPage/GoodsPage'
import GoodsTypePage from '../pages/GoodsTypePage/GoodsTypePage'
import MainShopPage from '../pages/MainShopPage/MainShopPage'

const ShopLayout = () => {
    // const { loading, error, data } = useQuery(GET_ALL_GOODS_TYPES)

    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error :(</p>
    // console.log(data)

    return (
        <div className='ShopLayout'>
            <div className='ShopLayout__container'>
                <Header />

                <Routes>
                    <Route
                        path={'/'}
                        element={<MainShopPage />}
                    />
                    <Route
                        path={'/types/:globalGoodsTypeId'}
                        element={<GoodsTypePage />}
                    />
                    <Route
                        path={'/types/:globalGoodsTypeId/:localGoodsTypeId'}
                        element={<GoodsTypePage />}
                    />
                    <Route
                        path={'/goods/:subGoodsTypeId'}
                        element={<GoodsPage />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default ShopLayout
