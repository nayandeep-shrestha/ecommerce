import { createSlice } from "@reduxjs/toolkit";
const CartSlicer = createSlice({
    name: "cart",
    initialState: {
        cartDetail: null
    },
    reducers: {
        setDetail: (state, action) => {
            let cart = JSON.parse(localStorage.getItem('cart')) ?? [];
            let current_item = action.payload
            if (cart.length) {
                //not empty
                let index = null
                cart.forEach((item, i) => {
                    if (item.product_id === current_item.product_id) {
                        index = i
                    }
                })
                if (index === null) {
                    //new item to cart
                    cart.push(current_item)
                } else {
                    //current item already exists in the cart
                    if(current_item.quantity <= 0){
                        cart.splice(index, 1)
                    }else{
                        cart[index]['quantity'] = current_item.quantity
                    }
                }
            } else {
                //empty
                cart.push(action.payload)
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            state.cartDetail = cart
        },
        updateCart: (state, action) => {
            let cart = JSON.parse(localStorage.getItem('cart')) ?? []
            state.cartDetail = cart
        }
    }
})
export const { setDetail, updateCart } = CartSlicer.actions
export default CartSlicer.reducer