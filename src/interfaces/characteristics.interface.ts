export type ICharacteristics = ICharacteristicGroup[]
export interface ICharacteristicGroup {
    id: number
    name: string
    items: ICharacteristicItem[]
}
export interface ICharacteristicItem {
    id: number
    name: string
    value: string
    description?: string
}
