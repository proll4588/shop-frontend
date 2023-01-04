import { atom } from 'recoil'

export enum appTypes {
    SHOP = 'SHOP',
    CONTROL = 'CONTROL',
}

const appTypesAtom = atom({
    key: 'AppTypesAtom',
    default: appTypes.SHOP,
})

export default appTypesAtom
