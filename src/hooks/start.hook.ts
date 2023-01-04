/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useSetRecoilState } from 'recoil'
import { GET_START_DATA } from './../apollo/fetchs'
import { useLazyQuery } from '@apollo/client'
import { useLayoutEffect, useState } from 'react'
import { CHECK_TOKEN } from '../apollo/fetchs'
import tokenAtom from '../atoms/token.atom'
import countsAtom from '../atoms/counts.atom'
import adminAtom from '../atoms/admin.atom'

const useStart = () => {
    /* Atoms */
    const [token, setToken] = useRecoilState(tokenAtom)
    // const [admin, setAdmin] = useRecoilState(adminAtom)
    const setAdmin = useSetRecoilState(adminAtom)
    const setCounts = useSetRecoilState(countsAtom)
    /* ===== */

    /* Флаги */
    const [isInit, setIsInit] = useState(false)

    const [veryfied, setVeryfied] = useState(false)
    const [getedData, setGetedData] = useState(false)
    /* ===== */

    /* Запросы */
    const [verifyToken, verData] = useLazyQuery(CHECK_TOKEN)
    const [getStartData, startData] = useLazyQuery(GET_START_DATA)
    /* ===== */

    const error = verData.error
        ? verData.error
        : startData.error
        ? startData.error
        : null
    /* ======= */

    /* Проверка инициализации проекта */
    useLayoutEffect(() => {
        if (veryfied && getedData) setIsInit(true)
    }, [veryfied, getedData])

    /* (1) проверяем валидность токена */
    useLayoutEffect(() => {
        if (token && token !== 'null') verifyToken()
        else setVeryfied(true)
    }, [])

    /* (2) После проверки токена поднимаем флаг о его проверке */
    useLayoutEffect(() => {
        if (verData.data) {
            if (!verData.data.verifyToken.verify) {
                localStorage.setItem('token', 'null')
                setToken('null')
            }

            setVeryfied(true)
            setAdmin(verData.data.verifyToken.isAdmin)
        }
    }, [verData.data])

    /* (3) Получаем первоночальные пользовательские данные если токен валидный */
    useLayoutEffect(() => {
        if (veryfied) {
            if (verData.data && verData.data.verifyToken.verify) {
                getStartData()
            } else {
                setGetedData(true)
            }
        }
    }, [veryfied])

    /* (4) Получаем пользовательские данные */
    useLayoutEffect(() => {
        if (startData.data) {
            const { getCart, getFavorite } = startData.data
            let cartCount = 0
            let favCount = getFavorite.length

            getCart.forEach((cart) => {
                cartCount += cart.count
            })

            setCounts({
                cart: cartCount,
                favorite: favCount,
            })
            setGetedData(true)
        }
    }, [startData.data])

    // Если вдруг мы залогинелись
    useLayoutEffect(() => {
        if (token && token !== 'null' && veryfied) {
            getStartData()
        }
    }, [token])

    return { isInit, error }
}

export default useStart
