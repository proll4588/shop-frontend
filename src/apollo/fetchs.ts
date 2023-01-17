import { IGlobalGoodsTypes } from './../interfaces/goodsTypes.interface'
import { IGood } from './../interfaces/good.interface'
import { gql } from '@apollo/client'
import IAllFilters from '../interfaces/IResponseFilters.interface'
import { ICharacteristics } from '../interfaces/characteristics.interface'

export const PHOTO_PAHT = `http://${process.env.REACT_APP_IP}/images/usersPhoto/`
export const GOODS_PATH = `http://${process.env.REACT_APP_IP}/images/goodsPhoto/`
export const TYPE_PATH = `http://${process.env.REACT_APP_IP}/images/typePhoto/`
export const LOGO_PATH = `http://${process.env.REACT_APP_IP}/images/brandsLogo/`

export interface IGetAllGoodsTypes {
    types: IGlobalGoodsTypes[]
}
export const GET_ALL_GOODS_TYPES = gql`
    query GetAllGoodsTypes {
        types {
            photo
            name
            id
            local_type_goods {
                id
                name
                photo
                sub_type_goods {
                    id
                    name
                    photo
                }
            }
        }
    }
`

export const GET_GOODS = gql`
    query GetGoods($search: String, $skip: Int, $take: Int) {
        getGoods(search: $search, skip: $skip, take: $take) {
            count
            goods {
                id
                name
                description
                show
                main_photo {
                    photo
                }
                current_price {
                    id
                    date
                    price
                    discount
                }
                brands {
                    id
                    name
                    logo
                }
                sub_type_goods {
                    id
                    name
                    photo
                }
                avg_rating {
                    count
                    avg
                }
                storage {
                    count
                }
            }
        }
    }
`

export interface IGetDataForGoodsPage {
    filteredGoods: {
        goods: IGood[]
        totalCount: number
    }
    filters: IAllFilters
}
export const GET_DATA_FOR_GOODS_PAGE = gql`
    query GetDataForGoodsPage(
        $subId: Int!
        $filters: AllFilterState
        $skip: Int
        $take: Int
        $sort: Int
    ) {
        filteredGoods(
            subId: $subId
            filters: $filters
            skip: $skip
            take: $take
            sort: $sort
        ) {
            totalCount
            goods {
                id
                name
                description
                show
                main_photo {
                    photo
                }
                current_price {
                    id
                    date
                    price
                    discount
                }
                brands {
                    id
                    name
                    logo
                }
                sub_type_goods {
                    id
                    name
                    photo
                }
                avg_rating {
                    count
                    avg
                }
                storage {
                    count
                }
            }
        }
        filters(subId: $subId) {
            typeFilters {
                id
                name
                type
                data {
                    ... on FilterListData {
                        values {
                            id
                            value
                        }
                    }
                    ... on FilterRangeData {
                        id
                        max
                        min
                    }
                }
            }
            generalFilters {
                price {
                    id
                    name
                    type
                    data {
                        ... on FilterListData {
                            values {
                                id
                                value
                            }
                        }
                        ... on FilterRangeData {
                            id
                            max
                            min
                        }
                    }
                }
                brand {
                    id
                    name
                    type
                    data {
                        ... on FilterListData {
                            values {
                                id
                                value
                            }
                        }
                        ... on FilterRangeData {
                            id
                            max
                            min
                        }
                    }
                }
            }
        }
    }
`

export const GET_FILTERS_BY_TYPE = gql`
    query GetDataForGoodsPage($subId: Int!) {
        filters(subId: $subId) {
            typeFilters {
                id
                name
                type
                data {
                    ... on FilterListData {
                        values {
                            id
                            value
                        }
                    }
                    ... on FilterRangeData {
                        id
                        max
                        min
                    }
                }
            }
            generalFilters {
                price {
                    id
                    name
                    type
                    data {
                        ... on FilterListData {
                            values {
                                id
                                value
                            }
                        }
                        ... on FilterRangeData {
                            id
                            max
                            min
                        }
                    }
                }
                brand {
                    id
                    name
                    type
                    data {
                        ... on FilterListData {
                            values {
                                id
                                value
                            }
                        }
                        ... on FilterRangeData {
                            id
                            max
                            min
                        }
                    }
                }
            }
        }
    }
`

export const GET_GOOD = gql`
    query GetGood($goodId: Int!) {
        good(id: $goodId) {
            id
            name
            main_photo {
                id
                goods_catalog_id
                photo
            }
            all_photos {
                id
                goods_catalog_id
                photo
            }
            current_price {
                id
                date
                price
                discount
            }
            all_prices {
                id
                date
                price
                discount
            }
            brands {
                id
                name
                logo
            }
            sub_type_goods {
                id
                name
                photo
            }
            avg_rating {
                count
                avg
            }
            storage {
                count
            }
            description
        }
    }
`

export interface IGetDataForGoodPage {
    good: IGood
    goodCharacteristics: ICharacteristics
}
export const GET_DATA_FOR_GOOD_PAGE = gql`
    query GetDataForGoodPage($goodId: Int!) {
        good(id: $goodId) {
            id
            name
            description
            main_photo {
                id
                goods_catalog_id
                photo
            }
            all_photos {
                id
                goods_catalog_id
                photo
            }
            current_price {
                id
                date
                price
                discount
            }
            all_prices {
                id
                date
                price
                discount
            }
            brands {
                id
                name
                logo
            }
            sub_type_goods {
                id
                name
                photo
            }
            avg_rating {
                count
                avg
            }
            storage {
                count
            }
        }
        goodCharacteristics(goodId: $goodId) {
            id
            name
            items {
                id
                name
                value
                description
            }
        }
    }
`

export const REGISTRATION_ACCOUNT = gql`
    mutation RegistrationAccount($email: String!, $password: String!) {
        registration(email: $email, password: $password) {
            token
        }
    }
`

export const LOGIN = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            isAdmin
        }
    }
`

export const CHECK_TOKEN = gql`
    query VerifyToken {
        verifyToken {
            verify
            isAdmin
        }
    }
`

export const ADD_TO_FAVORITE = gql`
    mutation AddToFavorite($goodId: Int!) {
        addToFavorite(goodId: $goodId) {
            id
            goods_catalog_id
            users_id
        }
    }
`

export const REMOVE_FROM_FAVORITE = gql`
    mutation RemoveFromFavorite($goodId: Int!) {
        removeFavorite(goodId: $goodId) {
            id
            goods_catalog_id
            users_id
        }
    }
`

export const GET_FAVORITE = gql`
    query GetFavorite {
        getFavorite {
            id
            name
            description
            main_photo {
                id
                goods_catalog_id
                photo
            }
            all_photos {
                id
                goods_catalog_id
                photo
            }
            current_price {
                id
                date
                price
                discount
            }
            all_prices {
                id
                date
                price
                discount
            }
            brands {
                id
                name
                logo
            }
            sub_type_goods {
                id
                name
                photo
            }
            avg_rating {
                count
                avg
            }
            storage {
                count
            }
        }
    }
`

export const GET_USER_DATA = gql`
    query Query {
        userData {
            id
            fname
            lname
            email
            phone_number
            gender
            address {
                id
                city
                street
                country
                ZIP
            }
            photo
            date_of_birthday
        }
    }
`

export const UPDATE_USER_DATA = gql`
    mutation UpdateUserData($data: UserData) {
        updateUserData(data: $data) {
            id
            fname
            lname
            email
            phone_number
            gender
            address {
                id
                city
                street
            }
            photo
            date_of_birthday
        }
    }
`

export const UPLOAD_USER_PHOTO = gql`
    mutation UploadUserPhoto($file: Upload!) {
        uploadUserPhoto(file: $file) {
            id
            fname
            lname
            email
            phone_number
            date_of_birthday
            gender
            address {
                id
                city
                street
                ZIP
                country
            }
            photo
        }
    }
`

export const GET_CART = gql`
    query GetCart {
        getCart {
            id
            count
            goods_catalog {
                id
                name
                description
                main_photo {
                    photo
                }
                current_price {
                    id
                    date
                    price
                    discount
                }
                brands {
                    id
                    name
                    logo
                }
                sub_type_goods {
                    id
                    name
                    photo
                }
                avg_rating {
                    count
                    avg
                }
                storage {
                    count
                }
            }
        }
    }
`

export const ADD_TO_CART = gql`
    mutation AddToCart($goodId: Int!, $count: Int!) {
        addToCart(goodId: $goodId, count: $count) {
            count
            id
            goods_catalog {
                id
                name
                description
                main_photo {
                    photo
                }
                current_price {
                    id
                    date
                    price
                    discount
                }
                brands {
                    id
                    name
                    logo
                }
                sub_type_goods {
                    id
                    name
                    photo
                }
                avg_rating {
                    count
                    avg
                }
                storage {
                    count
                }
            }
        }
    }
`

export const REMOVE_FROM_CART = gql`
    mutation RemoveFromCart($goodId: Int!) {
        removeFromCart(goodId: $goodId) {
            count
            id
            goods_catalog {
                id
                name
                description
                main_photo {
                    photo
                }
                current_price {
                    id
                    date
                    price
                    discount
                }
                brands {
                    id
                    name
                    logo
                }
                sub_type_goods {
                    id
                    name
                    photo
                }
                avg_rating {
                    count
                    avg
                }
                storage {
                    count
                }
            }
        }
    }
`

export const CHANGE_CART = gql`
    mutation ChangeCart($goodId: Int!, $count: Int!) {
        changeGoodInCart(goodId: $goodId, count: $count) {
            count
            id
            goods_catalog {
                id
                name
                description
                main_photo {
                    photo
                }
                current_price {
                    id
                    date
                    price
                    discount
                }
                brands {
                    id
                    name
                    logo
                }
                sub_type_goods {
                    id
                    name
                    photo
                }
                avg_rating {
                    count
                    avg
                }
                storage {
                    count
                }
            }
        }
    }
`

export const GET_START_DATA = gql`
    query GetStartData {
        getCart {
            id
            count
            goods_catalog {
                id
                name
                description
                main_photo {
                    photo
                }
                current_price {
                    id
                    date
                    price
                    discount
                }
                brands {
                    id
                    name
                    logo
                }
                sub_type_goods {
                    id
                    name
                    photo
                }
                avg_rating {
                    count
                    avg
                }
                storage {
                    count
                }
            }
        }
        getFavorite {
            id
            name
            description
            main_photo {
                id
                goods_catalog_id
                photo
            }
            all_photos {
                id
                goods_catalog_id
                photo
            }
            current_price {
                id
                date
                price
                discount
            }
            all_prices {
                id
                date
                price
                discount
            }
            brands {
                id
                name
                logo
            }
            sub_type_goods {
                id
                name
                photo
            }
            storage {
                count
            }
        }
    }
`

export const GET_GOOD_RATING = gql`
    query GetRating($goodId: Int!) {
        getRating(goodId: $goodId) {
            id
            goods_catalog_id
            users_id
            users {
                id
                fname
                lname
                photo
            }
            rating
            text
            date
        }
    }
`

export const CREATE_GOOD_RATING = gql`
    mutation CreateRating($goodId: Int!, $rating: Int!, $text: String) {
        createRating(goodId: $goodId, rating: $rating, text: $text) {
            id
            goods_catalog_id
            users_id
            users {
                id
                fname
                lname
                photo
            }
            rating
            text
            date
        }
    }
`

export const DELETE_GOOD_RATING = gql`
    mutation DeleteGoodRating($goodId: Int!) {
        deleteGoodRating(goodId: $goodId) {
            id
            goods_catalog_id
            users_id
            users {
                id
                fname
                lname
                photo
            }
            rating
            text
            date
        }
    }
`

export const UPDATE_GOOD_RATING = gql`
    mutation UpdateRating($goodId: Int!, $rating: Int, $text: String) {
        updateRating(goodId: $goodId, rating: $rating, text: $text) {
            id
            goods_catalog_id
            users_id
            users {
                id
                fname
                lname
                photo
            }
            rating
            text
            date
        }
    }
`

export const CREATE_ORDER = gql`
    mutation CreateOrder($payStatus: PayStatus!, $orderType: OrderTypes!) {
        createOrder(payStatus: $payStatus, orderType: $orderType) {
            id
            date
            operations_status_id
            payment_status_id
            order_types_id
            delivery_info {
                id
                count
                price
                goods_catalog {
                    id
                    name
                    description
                    main_photo {
                        id
                        goods_catalog_id
                        photo
                    }
                    all_photos {
                        id
                        goods_catalog_id
                        photo
                    }
                    current_price {
                        id
                        date
                        price
                        discount
                    }
                    all_prices {
                        id
                        date
                        price
                        discount
                    }
                    brands {
                        id
                        name
                        logo
                    }
                    sub_type_goods {
                        id
                        name
                        photo
                    }
                    storage {
                        count
                    }
                }
            }
        }
    }
`

export const GET_ORDERS = gql`
    query GetOrders(
        $skip: Int
        $take: Int
        $operStatus: String
        $search: String
    ) {
        getOrders(
            skip: $skip
            take: $take
            operStatus: $operStatus
            search: $search
        ) {
            count
            data {
                id
                date
                operations_status_id
                payment_status_id
                order_types_id
                delivery_info {
                    id
                    count
                    price
                    goods_catalog {
                        id
                        name
                        description
                        main_photo {
                            id
                            goods_catalog_id
                            photo
                        }
                        all_photos {
                            id
                            goods_catalog_id
                            photo
                        }
                        current_price {
                            id
                            date
                            price
                            discount
                        }
                        all_prices {
                            id
                            date
                            price
                            discount
                        }
                        brands {
                            id
                            name
                            logo
                        }
                        sub_type_goods {
                            id
                            name
                            photo
                        }
                        storage {
                            count
                        }
                    }
                }
            }
        }
    }
`

export const SET_MAIN_GOOD_PHOTO = gql`
    mutation UploadMainGoodPhoto($file: Upload!, $goodId: Int!) {
        uploadMainGoodPhoto(file: $file, goodId: $goodId) {
            id
        }
    }
`

export const ADD_GOOD_PHOTO = gql`
    mutation UploadGoodPhoto($file: Upload!, $goodId: Int!) {
        uploadGoodPhoto(file: $file, goodId: $goodId) {
            id
        }
    }
`

export const REMOVE_GOOD_PHOTO = gql`
    mutation DeleteGoodPhoto($photoId: Int!) {
        deleteGoodPhoto(photoId: $photoId) {
            id
        }
    }
`

export const GET_BRANDS = gql`
    query GetBrands($search: String) {
        getBrands(search: $search) {
            id
            name
        }
    }
`

export const CREATE_BRAND = gql`
    mutation CreateBrand($name: String!, $logo: String) {
        createBrand(name: $name, logo: $logo) {
            id
            name
            logo
        }
    }
`

export const UPLOAD_BRAND_LOGO = gql`
    mutation UploadLogoForNewBrand($file: Upload!) {
        uploadLogoForNewBrand(file: $file)
    }
`

export const SEARCH_TYPE = gql`
    query GetGoodTypesBySearch($search: String!) {
        getGoodTypesBySearch(search: $search) {
            name
            id
        }
    }
`

export const UPDATE_GOOD_DATA = gql`
    mutation UpdateGoodData(
        $goodId: Int!
        $description: String
        $name: String
        $subTypeId: Int
        $brandId: Int
    ) {
        updateGoodData(
            goodId: $goodId
            description: $description
            name: $name
            subTypeId: $subTypeId
            brandId: $brandId
        ) {
            id
            name
            main_photo {
                id
                goods_catalog_id
                photo
            }
            all_photos {
                id
                goods_catalog_id
                photo
            }
            current_price {
                id
                date
                price
                discount
            }
            all_prices {
                id
                date
                price
                discount
            }
            brands {
                id
                name
                logo
            }
            sub_type_goods {
                id
                name
                photo
            }
            avg_rating {
                count
                avg
            }
            storage {
                count
            }
            description
        }
    }
`

export const UPDATE_GOOD_PRICE = gql`
    mutation UpdateGoodPrice($goodId: Int!, $discount: Float, $price: Float!) {
        updateGoodPrice(goodId: $goodId, discount: $discount, price: $price) {
            id
            date
            price
            discount
        }
    }
`

export const GET_CHARACTERISTIC_GROUPS = gql`
    query GetCharacteristicGroupsByGoodId($goodId: Int!, $search: String) {
        getCharacteristicGroupsByGoodId(goodId: $goodId, search: $search) {
            id
            name
        }
    }
`

export const GET_CHARACTERISTIC_LIST = gql`
    query GetCharacteristicItem($groupId: Int!, $search: String) {
        getCharacteristicList(groupId: $groupId, search: $search) {
            id
            name
        }
    }
`

export const GET_CHARACTERISTIC_VALUES = gql`
    query GetCharacteristicValues($listId: Int!, $search: String) {
        getCharacteristicValues(listId: $listId, search: $search) {
            id
            value
        }
    }
`

export const ADD_CHARACTERISTIC = gql`
    mutation AddCharacteristicToGood(
        $goodId: Int!
        $valueId: Int!
        $listId: Int!
    ) {
        addCharacteristicToGood(
            goodId: $goodId
            valueId: $valueId
            listId: $listId
        ) {
            id
        }
    }
`

export const ADD_CHARACTERISTIC_GROUP = gql`
    mutation Mutation($subId: Int!, $name: String!) {
        addCharacteristicGroup(subId: $subId, name: $name) {
            id
            name
        }
    }
`

export const ADD_CHARACTERISTIC_LIST = gql`
    mutation AddCharacteristicList($groupId: Int!, $name: String!) {
        addCharacteristicList(groupId: $groupId, name: $name) {
            id
            name
        }
    }
`

export const ADD_CHARACTERISTIC_VALUE = gql`
    mutation AddCharacteristicValue($listId: Int!, $value: String!) {
        addCharacteristicValue(listId: $listId, value: $value) {
            id
            value
        }
    }
`

export const DELETE_GOOD_CHARACTERISTIC = gql`
    mutation Mutation($itemId: Int!, $goodId: Int!) {
        deleteGoodCharacteristic(itemId: $itemId, goodId: $goodId)
    }
`

export const CREATE_GOOD = gql`
    mutation CreateGood($subId: Int!, $name: String!) {
        createGood(subId: $subId, name: $name) {
            id
        }
    }
`

export const UPDATE_GLOBAL_TYPE = gql`
    mutation UpdateGlobalType($globalTypeId: Int!, $name: String!) {
        updateGlobalType(globalTypeId: $globalTypeId, name: $name) {
            id
            name
        }
    }
`

export const UPDATE_LOCAL_TYPE = gql`
    mutation UpdateLocalType($localTypeId: Int!, $name: String!) {
        updateLocalType(localTypeId: $localTypeId, name: $name) {
            id
            name
        }
    }
`

export const UPDATE_SUB_TYPE = gql`
    mutation UpdateSubType($subTypeId: Int!, $name: String!) {
        updateSubType(subTypeId: $subTypeId, name: $name) {
            id
            name
            photo
        }
    }
`

export const UPDATE_SUB_TYPE_PHOTO = gql`
    mutation UploadSubPhoto($subTypeId: Int!, $file: Upload!) {
        uploadSubPhoto(subTypeId: $subTypeId, file: $file) {
            id
            name
            photo
        }
    }
`

export const CREATE_GLOBAL_TYPE = gql`
    mutation AddGlobalType($name: String!) {
        addGlobalType(name: $name) {
            id
            name
        }
    }
`

export const CREATE_LOCAL_TYPE = gql`
    mutation AddLocalType($name: String!, $globalTypeId: Int!) {
        addLocalType(name: $name, globalTypeId: $globalTypeId) {
            id
            name
        }
    }
`

export const CREATE_SUB_TYPE = gql`
    mutation AddSubType($name: String!, $localTypeId: Int!) {
        addSubType(name: $name, localTypeId: $localTypeId) {
            id
            name
            photo
        }
    }
`

export const FIND_GLOBAL_TYPES = gql`
    query FindGlobalType($search: String!) {
        findGlobalType(search: $search) {
            id
            name
        }
    }
`

export const FIND_LOCAL_TYPES = gql`
    query FindLocalType($search: String!) {
        findLocalType(search: $search) {
            id
            name
        }
    }
`

export const DELETE_GLOBAL_TYPE = gql`
    mutation DeleteGlobalType($globalTypeId: Int!) {
        deleteGlobalType(globalTypeId: $globalTypeId) {
            id
            name
        }
    }
`

export const DELETE_LOCAL_TYPE = gql`
    mutation DeleteLocalType($localTypeId: Int!) {
        deleteLocalType(localTypeId: $localTypeId) {
            id
            name
        }
    }
`

export const DELETE_SUB_TYPE = gql`
    mutation DeleteSubType($subTypeId: Int!) {
        deleteSubType(subTypeId: $subTypeId) {
            id
            name
        }
    }
`

export const GET_ADMIN_ORDERS = gql`
    query GetAdminOrders(
        $take: Int
        $skip: Int
        $operStatus: String
        $search: String
    ) {
        getAdminOrders(
            take: $take
            skip: $skip
            operStatus: $operStatus
            search: $search
        ) {
            count
            data {
                id
                date
                delivery_info {
                    id
                    goods_catalog {
                        id
                        name
                    }
                    count
                    price
                }
                payment_status_id
                operations_status_id
                order_types_id
                users {
                    id
                    email
                    photo
                    phone_number
                }
            }
        }
    }
`

export const UPDATE_ORDER_STATUS = gql`
    mutation Mutation($orderId: Int!, $status: String!) {
        updateOrderStatus(orderId: $orderId, status: $status) {
            id
        }
    }
`

export const CHANGE_GOOD_STATUS = gql`
    mutation ChangeGoodStatus($goodId: Int!, $status: Boolean!) {
        changeGoodStatus(goodId: $goodId, status: $status) {
            id
            name
            show
        }
    }
`

export const GET_BUY_DYNAMIC_BY_YEAR = gql`
    query GetBuyDynamicByYear($year: Int!) {
        getBuyDynamicByYear(year: $year) {
            date
            profit
        }
    }
`

export const GET_GLOBAL_TYPE_BY_DYNAMIC_BY_RANGE = gql`
    query GetGlobalTypeBuyDynamicByRange($startDate: date!, $endDate: date!) {
        getGlobalTypeBuyDynamicByRange(
            startDate: $startDate
            endDate: $endDate
        ) {
            data {
                profit
                globalType {
                    id
                    name
                }
            }
            startDate
            endDate
        }
    }
`

export const GET_LOCAL_TYPE_BY_DYNAMIC_BY_RANGE = gql`
    query GetLocalTypeBuyDynamicByRange(
        $startDate: date!
        $endDate: date!
        $globalTypeId: Int
    ) {
        getLocalTypeBuyDynamicByRange(
            startDate: $startDate
            endDate: $endDate
            globalTypeId: $globalTypeId
        ) {
            startDate
            endDate
            data {
                profit
                localType {
                    id
                    name
                }
            }
        }
    }
`

export const GET_SUB_TYPE_BY_DYNAMIC_BY_RANGE = gql`
    query GetSubTypeBuyDynamicByRange(
        $startDate: date!
        $endDate: date!
        $localTypeId: Int
    ) {
        getSubTypeBuyDynamicByRange(
            startDate: $startDate
            endDate: $endDate
            localTypeId: $localTypeId
        ) {
            startDate
            endDate
            data {
                profit
                subType {
                    id
                    name
                }
            }
        }
    }
`

export const GET_MONTH_STATS = gql`
    query GetMonthStats($date: date) {
        getProfitByMonth(date: $date) {
            currentMonth {
                profit
            }
            lastMonth {
                profit
            }
        }

        getVisitMonth {
            curVisits
            lastVisits
        }

        getOrderCountMonth {
            curOrderCount
            lastOrderCount
        }
    }
`

export const GET_PROFIT_BY_MONTH = gql`
    query GetProfitByMonth($date: date) {
        getProfitByMonth(date: $date) {
            currentMonth {
                profit
            }
            lastMonth {
                profit
            }
        }
    }
`

export const ADD_VISIT = gql`
    mutation Mutation {
        addVisit
    }
`
