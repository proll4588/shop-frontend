import { NavLink, Route, Routes } from 'react-router-dom'
import ControlHead from '../components/ControlComponents/ControlHead/ControlHead'
import GoodRedactorPage from '../pages/GoodRedactorPage/GoodRedactorPage'
import GoodsRedactor from '../pages/GoodsRedactor/GoodsRedactor'
import './ControlLayout.module.scss'
import TypesRedactor from '../pages/TypesRedactor/TypesRedactor'
import OrdersRedactorPage from '../pages/OrdersRedactorPage/OrdersRedactorPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import styles from './ControlLayout.module.scss'
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosStats } from 'react-icons/io'
import { BsType } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import classNames from 'classnames'
import AppSwither from '../components/AppSwither/AppSwither'
import SupplyPage from '../pages/SupplyPage/SupplyPage'

const menu = [
    { id: 2, name: 'Статистика', route: 'statistics', icon: <IoIosStats /> },
    { id: 4, name: 'Типы товаров', route: 'typesRedactor', icon: <BsType /> },
    {
        id: 1,
        name: 'Управление товарами',
        route: 'goodsRedactor',
        icon: <AiOutlineShopping />,
    },
    {
        id: 3,
        name: 'Работа с заказами',
        route: 'orders',
        icon: <AiOutlineShoppingCart />,
    },
    { id: 5, name: 'Поставки', route: 'supply', icon: <BsType /> },
]

const SideBar = () => {
    return (
        <div className={styles.SideBar}>
            <div className={styles.SideBar__container}>
                {/* <div className={styles.SideBar__head}>Head</div> */}

                <div className={styles.SideBar__list}>
                    {menu.map((el) => (
                        <NavLink
                            key={el.id}
                            to={'/' + el.route}
                            className={({ isActive }) =>
                                classNames(
                                    styles.SideBar__element,
                                    isActive
                                        ? styles.SideBar__element_active
                                        : ''
                                )
                            }
                        >
                            <IconContext.Provider
                                value={{ className: styles.SideBar__icon }}
                            >
                                {el.icon}
                            </IconContext.Provider>

                            <div className={styles.SideBar__elName}>
                                {el.name}
                            </div>
                        </NavLink>
                    ))}
                </div>
                <AppSwither />
            </div>
        </div>
    )
}

const ControlLayout = () => {
    return (
        <div className={styles.ControlLayout}>
            <div className={styles.ControlLayout__container}>
                <SideBar />

                <div className={styles.ControlLayout__page}>
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
                        <Route
                            path={'/orders'}
                            element={<OrdersRedactorPage />}
                        />
                        <Route
                            path={'/statistics'}
                            element={<Dashboard />}
                        />
                        <Route
                            path={'/'}
                            element={<Dashboard />}
                        />
                        <Route
                            path={'/supply'}
                            element={<SupplyPage />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default ControlLayout
