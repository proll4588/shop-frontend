import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CategoriesPanel from './CategoriesPanel'
import { IGlobalGoodsTypes } from '../../interfaces/goodsTypes.interface'

// const data: IGlobalGoodsTypes[] = [
//     {
//         id: 1,
//         name: 'Компьютеры, комплектующие, ноутбуки',
//         photo: null,
//         localGoodsTypes: [
//             {
//                 id: 1,
//                 name: 'Компьютеры, ноутбуки и ПО',
//                 photo: null,
//                 subGoodsTypes: [
//                     {
//                         id: 1,
//                         name: 'Персональные компьютеры',
//                         photo: null,
//                     },
//                     {
//                         id: 2,
//                         name: 'Ноутбуки',
//                         photo: null,
//                     },
//                     {
//                         id: 3,
//                         name: 'Моноблоки',
//                         photo: null,
//                     },
//                 ],
//             },
//             {
//                 id: 2,
//                 name: 'Комплектующие для ПК',
//                 photo: null,
//                 subGoodsTypes: [
//                     {
//                         id: 4,
//                         name: 'Процессоры',
//                         photo: null,
//                     },
//                     {
//                         id: 5,
//                         name: 'Материнские платы',
//                         photo: null,
//                     },
//                     {
//                         id: 6,
//                         name: 'Видеокарты',
//                         photo: null,
//                     },
//                 ],
//             },
//             {
//                 id: 3,
//                 name: 'Периферия и аксессуары',
//                 photo: null,
//                 subGoodsTypes: [
//                     {
//                         id: 7,
//                         name: 'Мониторы',
//                         photo: null,
//                     },
//                     {
//                         id: 8,
//                         name: 'Клавиатуры',
//                         photo: null,
//                     },
//                     {
//                         id: 9,
//                         name: 'Мыши',
//                         photo: null,
//                     },
//                 ],
//             },
//         ],
//     },
// ]

describe('<CategoriesPanel />', () => {
    test('it should mount', () => {
        // render(<CategoriesPanel globalGoodsTypes={data} />)

        const categoriesPanel = screen.getByTestId('CategoriesPanel')

        expect(categoriesPanel).toBeInTheDocument()
    })
})
