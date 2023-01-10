import { Route, Routes } from 'react-router-dom'
import ControlHead from '../components/ControlComponents/ControlHead/ControlHead'
import GoodRedactorPage from '../pages/GoodRedactorPage/GoodRedactorPage'
import GoodsRedactor from '../pages/GoodsRedactor/GoodsRedactor'
import './ControlLayout.module.scss'
import TypesRedactor from '../pages/TypesRedactor/TypesRedactor'

const ControlLayout = () => {
    return (
        <div className='ControlLayout'>
            <div className='ControlLayout__container'>
                <ControlHead />
                <Routes>
                    <Route
                        path={'/goodsRedactor'}
                        element={<GoodsRedactor />}
                    />
                    <Route
                        path={'/goodsRedactor/:id'}
                        element={<GoodRedactorPage />}
                    />
                    <Route
                        path={'/typesRedactor'}
                        element={<TypesRedactor />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default ControlLayout
