import "./cart.css"
import { NavLink} from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import { product_svc } from "../../services/product.service"
import { removeFromCart, setDetail } from "../../reducers/cart.slicer"
import { RiCloseFill } from "react-icons/ri"

const Cart = () => {
    let cart = useSelector((store) => {
        return store.cart.cartDetail
    })
    let [cartData, setCartData] = useState()
    const getCartData = useCallback(async (cart) => {
        try {
            let result = await product_svc.getCartDetail(cart)
            if (result) {
                setCartData(result.result)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(() => {
        if (cart && cart.length > 0) {
            getCartData(cart)
        }
    }, [cart, getCartData])
    let dispatch = useDispatch()
    const updateCart = (e) => {
        e.preventDefault()
        cart.forEach((item) => {
            let updateProd = {
                product_id: item.product_id,
                quantity: document.getElementById(item.product_id).value
            }
            dispatch(setDetail(updateProd))
        })
    }
    const removeCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }
    return (
        <section className='container-fluid'>
            <div className="cart-container">
                <header className="cart-header"><h1>My Cart</h1></header>
                <div className="cart-content">

                    {
                        cartData ? <>
                            <form onSubmit={updateCart}>
                                <table cellSpacing="0" className="cart-table">
                                    <thead>
                                        <tr>
                                            <th className='item-delete'>&nbsp;</th>
                                            <th className='item-thumb'>&nbsp;</th>
                                            <th className='item-name'>Product</th>
                                            <th className='item-price'>Price</th>
                                            <th className='item-quantity'>Quantity</th>
                                            <th className='item-subtotal'>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartData.map((item, index) => (
                                                <tr className="cart-item" key={index}>
                                                    <td className="item-delete">
                                                        <button onClick={() => removeCart(item)} className='remove'><RiCloseFill /></button>
                                                    </td>
                                                    <td className='item-thumb'>
                                                        <NavLink to={"/products/" + item.product_id}>
                                                            <img src={process.env.REACT_APP_IMAGE_URL + "/product/" + item.image} alt="" />
                                                        </NavLink>
                                                    </td>
                                                    <td className='item-name'>
                                                        <NavLink to={"/products/" + item.product_id}>{item.name}</NavLink>
                                                    </td>
                                                    <td className='item-price'>
                                                        <span className="price-amt">
                                                            Rs.&nbsp;{item.price}
                                                        </span>
                                                    </td>
                                                    <td className='item-quantity'>
                                                        <div className="quantity">
                                                            <input type="number" id={item.product_id} name={item.name} defaultValue={item.qty} />
                                                        </div>
                                                    </td>
                                                    <td className='item-subtotal'>
                                                        <span className="price-amt">
                                                            Rs.&nbsp;{item.total_amt}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan='6' className="cart-actions">
                                                <button type="submit" className="update-cart btn">Update Cart</button>
                                                <div className="proceed-to-checkout">
                                                    <NavLink to="/checkout" className="checkout-btn btn-main btn">Proceed to checkout</NavLink>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </>
                            :
                            <>
                                <div id="no-item" className="alert-box" style={{display:"block"}}>
                                    No Items Found in Cart
                                </div>
                            </>
                    }


                </div>
            </div>
        </section >
    )
}

export default Cart