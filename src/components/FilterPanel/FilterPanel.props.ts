import { IBrand } from '../../interfaces/good.interface'

export default interface FilterPanelProps {
    data: IFilterData
    onChange?: (data: IFilters) => void
    value?: IFilters
}

export interface IFilterData {
    brands: IBrand[]
    price: {
        min: number
        max: number
    }
}

export interface IFilters {
    brands?: string[]
    price?: {
        min: number
        max: number
    }
    other?: {
        name: string
        params: string[]
    }
}
