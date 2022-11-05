import { useState, useEffect } from 'react'

const useStorage = (key) => {
    const get = () => {
        const item = localStorage.getItem(key)
        if (item) return item
        else return null
    }

    const set = (data) => {
        localStorage.setItem(key, data)
    }

    const [currentData, setCurrentData] = useState(get())

    useEffect(() => {
        set(currentData)
    }, [currentData])

    return { currentData, setCurrentData }
}

export default useStorage
