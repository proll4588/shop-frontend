import { atom } from 'recoil'

const tokenAtom = atom<string>({
    key: 'tokenAtom',
    default: localStorage.getItem('token'),
})

export default tokenAtom
