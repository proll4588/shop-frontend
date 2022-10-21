import {atom} from "recoil";


const basicFiltersAtom = atom({
    key: "basicFiltersAtom",
    default: {
        brands: null,
        price: null
    }
})

export default basicFiltersAtom