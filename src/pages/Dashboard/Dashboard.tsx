import React, { FC, ReactNode, useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import DashboardProps from './Dashboard.props'
import BuyDynamic, { BuyGraph } from '../../components/BuyDynamic/BuyDynamic'
import GlobalTypesBuyDynamic from '../../components/GlobalTypesBuyDynamic/GlobalTypesBuyDynamic'
import LocalTypesBuyDynamic from '../../components/LocalTypesBuyDynamic/LocalTypesBuyDynamic'
import SubTypesBuyDynamic from '../../components/SubTypesBuyDynamic/SubTypesBuyDynamic'
import {
    BsArrowDownRight,
    BsArrowUpRight,
    BsPersonCircle,
} from 'react-icons/bs'
import classNames from 'classnames'
import { IconContext } from 'react-icons'
import { AiFillDollarCircle, AiOutlineShoppingCart } from 'react-icons/ai'
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    Legend,
    Cell,
} from 'recharts'
import { useQuery } from '@apollo/client'
import {
    GET_GLOBAL_TYPE_BY_DYNAMIC_BY_RANGE,
    GET_MONTH_STATS,
} from '../../apollo/fetchs'
import Loader from '../../components/UI/Loader/Loader'
import StatisticTabs from '../../components/StatisticTabs/StatisticTabs'

const COLORS = [
    '#ff595e',
    '#ffca3a',
    '#8ac926',
    '#1982c4',
    '#6a4c93',
    '#ff595e',
    '#ffca3a',
    '#8ac926',
    '#1982c4',
    '#6a4c93',
]
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill='white'
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline='central'
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

const GlobalPie = () => {
    const curDate = new Date()
    let start = new Date()
    start.setDate(1)
    let end = new Date(curDate)

    const [startDate, setStartDate] = useState(
        start.toISOString().substring(0, 10)
    )
    const [endDate, setEndDate] = useState(end.toISOString().substring(0, 10))

    const { data, error, loading } = useQuery(
        GET_GLOBAL_TYPE_BY_DYNAMIC_BY_RANGE,
        {
            variables: {
                startDate: startDate,
                endDate: endDate,
            },
        }
    )

    if (loading) return <Loader page />
    if (error) return <>Error</>

    const rendData = data.getGlobalTypeBuyDynamicByRange.data.map((el) => ({
        name: el.globalType.name,
        value: el.profit || 0,
    }))

    return (
        <ResponsiveContainer
            width='100%'
            height='100%'
        >
            <PieChart
                width={80}
                height={80}
            >
                <Pie
                    dataKey='value'
                    isAnimationActive={false}
                    data={rendData}
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    label={renderCustomizedLabel}
                    labelLine={false}
                >
                    {rendData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}

interface DashboardHeadElementProps {
    icon: ReactNode
    name: string
    mainText: string
    direction: 'up' | 'down'
    stats: string | number
    subText: string
}
const DashboardHeadElement: FC<DashboardHeadElementProps> = ({
    direction,
    icon,
    mainText,
    name,
    stats,
    subText,
}) => {
    return (
        <div className={styles.DashboardHeadElement}>
            <div className={styles.DashboardHeadElement__container}>
                <div className={styles.DashboardHeadElement__head}>
                    <div
                        className={
                            styles.DashboardHeadElement__headIconContainer
                        }
                    >
                        <IconContext.Provider
                            value={{
                                className:
                                    styles.DashboardHeadElement__mainIcon,
                            }}
                        >
                            {icon}
                        </IconContext.Provider>
                    </div>
                    <div className={styles.DashboardHeadElement__headText}>
                        {name}
                    </div>
                </div>

                <div className={styles.DashboardHeadElement__mainText}>
                    {mainText}
                </div>

                <div className={styles.DashboardHeadElement__footer}>
                    <div
                        className={classNames(
                            styles.DashboardHeadElement__footerLeft,
                            direction === 'down'
                                ? styles.DashboardHeadElement__footerLeft_down
                                : styles.DashboardHeadElement__footerLeft_up
                        )}
                    >
                        <div
                            className={
                                styles.DashboardHeadElement__arrowContainer
                            }
                        >
                            {direction === 'down' ? (
                                <BsArrowDownRight
                                    className={classNames(
                                        styles.DashboardHeadElement__arrow,
                                        styles.DashboardHeadElement__arrow_down
                                    )}
                                />
                            ) : (
                                <BsArrowUpRight
                                    className={classNames(
                                        styles.DashboardHeadElement__arrow,
                                        styles.DashboardHeadElement__arrow_up
                                    )}
                                />
                            )}
                        </div>
                        <div className={styles.DashboardHeadElement__stats}>
                            {stats}%
                        </div>
                    </div>
                    <div className={styles.DashboardHeadElement__footerRight}>
                        {subText} за этот месяц
                    </div>
                </div>
            </div>
        </div>
    )
}
const DashboardHead: FC = () => {
    const { data, error, loading } = useQuery(GET_MONTH_STATS)

    if (error) return <>error</>
    if (loading) return <Loader page />

    // TODO: РАсчёты вынести в компонент
    // ===========
    const curProfit = data.getProfitByMonth.currentMonth.profit | 0
    const lastProfit = data.getProfitByMonth.lastMonth.profit | 0
    const proc =
        lastProfit !== 0
            ? Math.abs(
                  Math.round((100 - (curProfit * 100) / lastProfit) * 100) / 100
              )
            : 0
    const abs = curProfit - lastProfit
    // ===========

    // ===========
    const curVisits = data.getVisitMonth.curVisits
    const lastVisits = data.getVisitMonth.lastVisits
    const visitProc =
        lastVisits !== 0
            ? Math.abs(
                  Math.round((100 - (curVisits * 100) / lastVisits) * 100) / 100
              )
            : 0
    const visitAbs = curVisits - lastVisits
    // ===========

    //
    const curOrderCount = data.getOrderCountMonth.curOrderCount
    const lastOrderCount = data.getOrderCountMonth.lastOrderCount
    const orderProc =
        lastOrderCount !== 0
            ? Math.abs(
                  Math.round(
                      (100 - (curOrderCount * 100) / lastOrderCount) * 100
                  ) / 100
              )
            : 0
    const orderAbs = curOrderCount - lastOrderCount
    //

    return (
        <div className={styles.DashboardHead}>
            <div className={styles.DashboardHead__container}>
                <DashboardHeadElement
                    name='Доход'
                    icon={<AiFillDollarCircle />}
                    mainText={curProfit.toLocaleString('ru-RU') + 'р'}
                    direction={curProfit - lastProfit > 0 ? 'up' : 'down'}
                    stats={proc.toLocaleString('ru-RU')}
                    subText={
                        (abs > 0 ? '+' : '') + abs.toLocaleString('ru-RU') + 'р'
                    }
                />
                <DashboardHeadElement
                    name='Посещения'
                    icon={<BsPersonCircle />}
                    mainText={curVisits.toLocaleString('ru-RU')}
                    direction={curVisits - lastVisits > 0 ? 'up' : 'down'}
                    stats={visitProc.toLocaleString('ru-RU')}
                    subText={
                        (visitAbs > 0 ? '+' : '') +
                        visitAbs.toLocaleString('ru-RU')
                    }
                />
                <DashboardHeadElement
                    direction={orderAbs > 0 ? 'up' : 'down'}
                    icon={<AiOutlineShoppingCart />}
                    mainText={curOrderCount.toLocaleString('ru-RU')}
                    name='Заказы'
                    stats={orderProc.toLocaleString('ru-RU')}
                    subText={
                        (orderAbs > 0 ? '+' : '') +
                        orderAbs.toLocaleString('ru-RU')
                    }
                />
            </div>
        </div>
    )
}

const Dashboard: FC<DashboardProps> = () => {
    return (
        <div className={styles.Dashboard}>
            <div className={styles.Dashboard__container}>
                <h3 className={styles.Dashboard__title}>
                    Статистика за текущий месяц
                </h3>
                <DashboardHead />
                <div className={styles.Dashboard__BuyDynamic}>
                    <div className={styles.Dashboard__BuyDynamicGraph}>
                        <h4 className={styles.Dashboard__title}>
                            Доход по месяцам
                        </h4>
                        <BuyGraph year={2022} />
                    </div>
                    <div className={styles.Dashboard__BuyDynamicPie}>
                        <h4 className={styles.Dashboard__title}>
                            Доход по категориям
                        </h4>
                        <GlobalPie />
                    </div>
                </div>
                <h4 className={styles.Dashboard__title}>
                    Гибкие графики доходов
                </h4>
                <StatisticTabs
                    tabs={[
                        <BuyDynamic />,
                        <GlobalTypesBuyDynamic />,
                        <LocalTypesBuyDynamic />,
                        <SubTypesBuyDynamic />,
                    ]}
                />
            </div>
        </div>
    )
}

export default Dashboard
