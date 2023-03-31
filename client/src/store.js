import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './reducers/user.slicer'
import CartReducer from './reducers/cart.slicer'
const rootStore = configureStore({
    reducer:{
        user: UserReducer,
        cart: CartReducer
    }
})

export default rootStore

//combination of state and action ===> Reducer 