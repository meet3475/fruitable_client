import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reduce";
import { counterReducer } from "./counter.reduce";
import { productReducer } from "./product.reducer";
import { fruitesReducer } from "./shop.reducer";
import { reviewReducer } from "./review.reducer";
import counterSlice from "../slice/counter.slice";

import couponSlice from "../slice/coupon.slice";
import { categoriesReducer } from "./catagory.reducer";
import subcategorySlice from "../slice/subcategory.slice";
import { variantReducer } from "./variant.reducer";
import { salespeopleReducer } from "./salespeople.reducer";
import authSlice from "../slice/auth.slice";
import alertsSlice from "../slice/alerts.slice";
import cartSlice from "../slice/cart.slice";



export const RootReducer = combineReducers({
    facilities: facilitiesReducer,
    counter: counterReducer,
    product: productReducer,
    fruites: fruitesReducer,
    reviews: reviewReducer,
    counter_slice : counterSlice,
    cart: cartSlice,
    coupon: couponSlice,
    categories: categoriesReducer,
    subcategories: subcategorySlice,
    variant: variantReducer,
    salespeople: salespeopleReducer,
    auth: authSlice,
    alert: alertsSlice
})