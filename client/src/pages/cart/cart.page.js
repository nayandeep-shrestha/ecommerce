import "./cart.css"
import { NavLink } from "react-router-dom"
import {RiCloseFill} from "react-icons/ri"
import phone from "../../assets/images/categories/smartphones.png"
const Cart = () => {
    return (
        <section className='container-fluid'>
            <div className="cart-container">
                <header className="cart-header"><h1>My Cart</h1></header>
                <div className="cart-content">
                    <form action="" method="post">
                        <table cellspacing="0" className="cart-table">
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
                                <tr className="cart-item">
                                    <td className="item-delete">
                                        <a href="#" className='remove'><RiCloseFill/></a>
                                    </td>
                                    <td className='item-thumb'>
                                        <NavLink to="/">
                                            <img src={phone} alt="" />
                                        </NavLink>
                                    </td>
                                    <td className='item-name'>
                                        <NavLink to="/">Samsung S23 Ultra</NavLink>
                                    </td>
                                    <td className='item-price'>
                                        <span className="price-amt">
                                            Rs. &nbsp;151999
                                        </span>
                                    </td>
                                    <td className='item-quantity'>
                                        <div className="quantity">
                                            <input type="number" />
                                        </div>
                                    </td>
                                    <td className='item-subtotal'>
                                        <span className="price-amt">
                                            Rs. &nbsp;151999
                                        </span>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td colSpan='6' className="cart-actions">
    

                                        <button type="submit" className="update-cart btn">Update Cart</button>
                                        <div className="proceed-to-checkout">
                                            <NavLink to="/checkout" className="checkout-btn btn">Proceed to checkout</NavLink>
                                        </div>
     
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Cart