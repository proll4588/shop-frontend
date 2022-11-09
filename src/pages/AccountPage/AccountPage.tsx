import { useQuery } from '@apollo/client'
import React, { FC, useEffect, useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { GET_USER_DATA } from '../../apollo/fetchs'
import tokenAtom from '../../atoms/token.atom'
import UserNav from '../../components/UserNav/UserNav'
import PersonalInfoPage from '../PersonalInfoPage/PersonalInfoPage'
import styles from './AccountPage.module.scss'
import AccountPageProps from './AccountPage.props'

const userPhoto =
    'https://sun2.sibirix.userapi.com/s/v1/ig2/Os9abdXjY9O349S1rcKaGypeabp5XmsoZCfN4jgOHudHQdLcmvPznJK9QVY1oOUSdUxnx_gyhiWLCLlRn8fNoxK3.jpg?size=717x1080&quality=96&type=album'

const AccountPage: FC<AccountPageProps> = () => {
    const token = useRecoilValue(tokenAtom)
    const navigate = useNavigate()

    const { data, loading, error } = useQuery(GET_USER_DATA)

    useLayoutEffect(() => {
        if (!token || token === 'null') {
            navigate('/auth')
        }
    }, [token])

    if (loading) return <>Loading</>
    if (error) return <>Error</>
    console.log(data)
    const { userData } = data

    return (
        <div className={styles.AccountPage}>
            <div className={styles.AccountPage__container}>
                <UserNav
                    userInfo={{
                        // email: 'emaile@lolo.com',
                        // fname: 'Kostya',
                        // lname: 'Valkov',
                        // photo: userPhoto,
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
                        element={<>favorite</>}
                    />

                    {/* Заказы пользователя */}
                    <Route
                        path={'orders'}
                        element={<>orders</>}
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
                </Routes>
            </div>
        </div>
    )
}

export default AccountPage
