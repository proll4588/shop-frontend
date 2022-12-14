import IAllFilters from '../../interfaces/IResponseFilters.interface'

export default interface FilterPanelProps {
    filters: IAllFilters

    onChange?: (data: IAllFilterState) => void
    value?: IAllFilterState
}

export interface IAllFilterState {
    generalFilters: IGeneralFilterState
    typeFilters: ITypeFilterState[]
}

export interface IGeneralFilterState {
    brand: IListFilterState
    price: IRangeFilterState
    // ...
}

type IListFilterState = number[]
interface IRangeFilterState {
    max: number
    min: number
}

export interface ITypeFilterState {
    id: number
    state: IListFilterState | IRangeFilterState
}
