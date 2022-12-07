import { useQuery } from '@apollo/client'
import { errorMonitor } from 'events'
import React, { FC } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { GET_USER_DATA } from '../../apollo/fetchs'
import tokenAtom from '../../atoms/token.atom'
import Loader from '../../components/UI/Loader/Loader'
import UserNav from '../../components/UserNav/UserNav'
import FavoritePage from '../FavoritePage/FavoritePage'
import OrdersPage from '../OrdersPage/OrdersPage'
import PersonalInfoPage from '../PersonalInfoPage/PersonalInfoPage'
import styles from './AccountPage.module.scss'
import AccountPageProps from './AccountPage.props'

const LogOut = () => {
    localStorage.setItem('token', 'null')
    window.location.reload()

    return <>LogOut</>
}

// TODO: При входе в аккаунт выскакивает ошибка
const AccountPage: FC<AccountPageProps> = () => {
    const token = useRecoilValue(tokenAtom)
    const { data, loading, error } = useQuery(GET_USER_DATA)

    if (loading) return <Loader page />
    if (
        error &&
        error.graphQLErrors[0].extensions.code === 'USER_IS_NOT_AUTHENTICATED'
    )
        return <Navigate to={'/auth'} />
    if (error) return <>{JSON.stringify(error)}</>

    if (!token || token === 'null') {
        return <Navigate to={'/auth'} />
    }

    const { userData } = data

    return (
        <div className={styles.AccountPage}>
            <div className={styles.AccountPage__container}>
                {/* TODO: Может не быть имени и фамилии */}
                <UserNav
                    userInfo={{
                        email: userData.email,
                        fname: userData.fname,
                        lname: userData.lname,
                        photo: userData.photo,
                    }}
                />
                <Routes>
                    {/*
                     * Если пользователь попытается перейти просто на
                     * /account, то его автоматически перебрости на /account/personalInfo
                     */}
                    <Route
                        path={'/'}
                        element={<Navigate to={'personalInfo'} />}
                    />

                    {/* Персональная информация */}
                    <Route
                        path={'personalInfo'}
                        element={<PersonalInfoPage userData={data.userData} />}
                    />

                    {/* Список избранного */}
                    <Route
                        path={'favorite'}
                        element={<FavoritePage />}
                    />

                    {/* Заказы пользователя */}
                    <Route
                        path={'orders'}
                        element={<OrdersPage />}
                    />

                    {/* Уведомления */}
                    <Route
                        path={'notifications'}
                        element={<>notifications</>}
                    />

                    {/* Способы оплаты */}
                    <Route
                        path={'payment'}
                        element={<>payment</>}
                    />

                    <Route
                        path={'logout'}
                        element={<LogOut />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default AccountPage
