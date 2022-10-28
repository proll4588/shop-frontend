import {
    IFilterListData,
    IFilterRangeData,
} from './../../interfaces/IResponseFilters.interface'

export default interface FiltersMenuElementsProps {
    title: string
    type: 'range' | 'list'
    data: IFilterListData | IFilterRangeData

    onChange?: (data: { min: number; max: number } | number[]) => void
    value?: { min: number; max: number } | number[]
}
