import {Route, Routes} from "react-router-dom";
import GoodsTypePage from "../pages/GoodsTypePage/GoodsTypePage";

const ShopLayout = ({}) => {
    return (
        <div className='ShopLayout'>
            <div className='ShopLayout__container'>
                <Routes>
                    <Route path={"/types"} element={<GoodsTypePage />}/>
                    <Route path={"/types/:globalGoodsTypeId"} element={<GoodsTypePage />}/>
                    <Route path={"/types/:globalGoodsTypeId/:localGoodsTypeId"} element={<GoodsTypePage />}/>
                </Routes>
            </div>
        </div>
    )
}

export default ShopLayout
