import React, { FC } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import ControlGoodsElement from '../ControlGoodsElement/ControlGoodsElement'
import styles from './ControlGoodsList.module.scss'
import ControlGoodsListProps from './ControlGoodsList.props'

const ControlGoodsList: FC<ControlGoodsListProps> = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.ControlGoodsList}>
            <div className={styles.ControlGoodsList__container}>
                {data.map((good) => (
                    <Link
                        to={`/goodsRedactor/${good.id}`}
                        key={good.id}
                    >
                        <ControlGoodsElement data={good} />
                    </Link>
                ))}
                {/* <AddElement /> */}

                {/* <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 650 }}
                        size='small'
                        aria-label='a dense table'
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align='right'>Brand</TableCell>
                                <TableCell align='right'>Type</TableCell>
                                <TableCell align='right'>Price</TableCell>
                                <TableCell align='right'>Id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((good) => (
                                <TableRow
                                    key={good.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                    hover
                                    onClick={() => {
                                        console.log('click')
                                        navigate(`/goodsRedactor/${good.id}`)
                                    }}
                                >
                                    <TableCell>{good.name}</TableCell>

                                    <TableCell align='right'>
                                        {good.brand_name}
                                    </TableCell>

                                    <TableCell align='right'>
                                        {good.type_name}
                                    </TableCell>

                                    <TableCell align='right'>
                                        {good.price}
                                    </TableCell>

                                    <TableCell align='right'>
                                        {good.id}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
            </div>
        </div>
    )
}

export default ControlGoodsList
