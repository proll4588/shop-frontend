/* Это все фильтры получаемые с сервера */
interface IAllFilters {
    generalFilters: IGeneralFilters
    typeFilters: IFilter[]
}

interface IGeneralFilters {
    // TODO: Реализовать данные фильтры
    // shop: IFilter
    // rating: IFilter
    price: IFilter
    // discount: IFilter
    brand: IFilter
}

interface IFilter {
    // null только для общих фильтров
    id: number | null

    name: string
    type: 'list' | 'range'
    data: IFilterListData | IFilterRangeData
}

export interface IFilterListDataElement {
    id: number
    value: string
}

export interface IFilterListData {
    values: IFilterListDataElement[]
}

export interface IFilterRangeData {
    // null только для общих фильтров
    id: number | null

    min: number
    max: number
}
export default IAllFilters
