import React, { FC, useState } from 'react'
import styles from './SubTypesBuyDynamic.module.scss'
import SubTypesBuyDynamicProps from './SubTypesBuyDynamic.props'
import useDebounce from '../../hooks/debounce.hook'
import { useQuery } from '@apollo/client'
import {
    FIND_LOCAL_TYPES,
    GET_SUB_TYPE_BY_DYNAMIC_BY_RANGE,
} from '../../apollo/fetchs'
import { ISubTypeStats } from '../../interfaces/statistic.interface'
import {
    BarChart,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from 'recharts'
import MyCombobox from '../UI/MyCombobox/MyCombobox'

interface LocalTypesComboboxProps {
    onChange?: (id: number) => void
}
export const LocalTypesCombobox: FC<LocalTypesComboboxProps> = ({
    onChange,
}) => {
    const [query, setQuery] = useState('')

    const { data, error, loading } = useQuery(FIND_LOCAL_TYPES, {
        variables: { search: query },
    })

    const types = data ? data.findLocalType : []

    return (
        <div className={styles.LocalTypesCombobox}>
            <MyCombobox
                elements={types}
                onQuering={setQuery}
                onSelect={onChange}
                loading={loading || !!error}
                canBeNull
                nullValue='Все'
            />
        </div>
    )
}

interface SubGraphProps {
    data: ISubTypeStats
}
const SubGraph: FC<SubGraphProps> = ({ data }) => {
    const renderData = data.data.map((el) => {
        return {
            name: el.subType.name,
            profit: el.profit,
        }
    })
    return (
        <ResponsiveContainer
            width='100%'
            height='100%'
        >
            <BarChart
                width={500}
                height={300}
                data={renderData}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    dataKey='name'
                    stroke='#ffffff'
                />
                <YAxis stroke='#ffffff' />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey='profit'
                    name='Прибыль'
                    fill='#00b5ff'
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

const SubTypesBuyDynamic: FC<SubTypesBuyDynamicProps> = () => {
    const startYear = 2022
    const currentYear = new Date().getFullYear()

    // TODO: Мб сделать хук useDateRange
    const [startDate, setStartDate] = useState(
        new Date(startYear, 0, 2).toISOString().substring(0, 10)
    )
    const [endDate, setEndDate] = useState(
        new Date(currentYear, 0, 2).toISOString().substring(0, 10)
    )
    const dbStartDate = useDebounce(startDate, 600)
    const dbEndDate = useDebounce(endDate, 600)

    const [localId, setLocalId] = useState(null)

    const { data, error, loading } = useQuery(
        GET_SUB_TYPE_BY_DYNAMIC_BY_RANGE,
        {
            variables: {
                localTypeId: localId === -1 ? null : localId,
                startDate: dbStartDate,
                endDate: dbEndDate,
            },
        }
    )

    const startDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const endDateChange = (e) => {
        setEndDate(e.target.value)
    }

    return (
        <div className={styles.SubTypesBuyDynamic}>
            <div className={styles.SubTypesBuyDynamic__container}>
                <input
                    type={'date'}
                    onChange={startDateChange}
                    defaultValue={startDate}
                />
                <input
                    type={'date'}
                    onChange={endDateChange}
                    defaultValue={endDate}
                />
                <LocalTypesCombobox onChange={setLocalId} />
                {data ? (
                    <SubGraph data={data.getSubTypeBuyDynamicByRange} />
                ) : (
                    <>loading</>
                )}
            </div>
        </div>
    )
}

export default SubTypesBuyDynamic
