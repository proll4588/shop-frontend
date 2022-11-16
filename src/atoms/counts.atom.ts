import { atom } from 'recoil'

const countsAtom = atom({
    key: 'countsAtom',
    default: {
        favorite: 0,
        cart: 0,
    },
})

export default countsAtom
