import { createSlice } from "@reduxjs/toolkit";
const CartSlicer = createSlice({
    name: "cart",
    initialState: {
        cartDetail: null
    },
    reducers:{
        setDetail : (state,action) =>{

        }
    }
})
export const {setDetail} = CartSlicer.actions
export default CartSlicer.reducer