import React, { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { product_svc } from "../../services/product.service"
import { resetCart } from "../../reducers/cart.slicer"
import "./checkout.css"
import AuthService from "../../services/auth.service"

const Checkout = () => {
  let [profileDetails, setProfileDetails] = useState()
  const getMyProfile = useCallback(async () => {
    try {
      let auth_svc = new AuthService()
      let result = await auth_svc.getMyProfile()
      if (result) {
        setProfileDetails(result.result)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  let [cartData, setCartData] = useState()
  let [emailDisable, setEmailDisable] = useState(true)
  let [mobDisable, setMobDisable] = useState(true)
  let [addressDisable, setAddressDisable] = useState(true)
  let [item_total, setItemTotal] = useState(0)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const cart = useSelector((store) => {
    return store.cart.cartDetail
  })
  const getCartData = useCallback(async (cart) => {
    try {
      let result = await product_svc.getCartDetail(cart)
      if (result) {
        setCartData(result.result)
        item_total = 0
        result.result.forEach((item) => {
          item_total += Number(item.total_amt)
        })
        setItemTotal(item_total)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  const placeOrder = async (e) => {
    try {
      e.preventDefault()
      if (cart && cart.length > 0) {
        let response = await product_svc.createOrder({
          "cart": cart,
          "discount": 0,
          "delivery_charge": 100,
          "is_paid": false,
          "address": document.getElementById("check-address").value,
          "mobile": document.getElementById("check-mobile").value,
          "email": document.getElementById("check-email").value
        })

        if (response.status) {
          toast.success("Order has been placed.")
          dispatch(resetCart())
          navigate("/customer/orders")
        } else {
          toast.error("Your order could not be placed. Please try again after few minutes.")
        }
      } else {
        document.getElementById("no-items").style.display = "block"
        navigate("/checkout")
      }
    } catch (error) {
      toast.warning(error)
      navigate("/cart")
    }
  }
  useEffect(() => {
    let token = localStorage.getItem("user_token") ?? null
    if (!token) {
      navigate("/login")
      toast.info("You must log in first in order to checkout!!")
    }
    getMyProfile()
  }, [getMyProfile, navigate])
  useEffect(() => {
    if (cart && cart.length > 0) {
      getCartData(cart)
    }
  }, [cart, getCartData])
  return (
    <section className='container-fluid'>
      <div className="cart-container">
        <header className="cart-header"><h1>Checkout</h1></header>
        {
          cartData ? <>
            <div className="checkout-wrapper">
              <form onSubmit={placeOrder}>
              <div className="checkout-address">
                <div className="checkout-address-item">
                  <div className="title">Deliver to: &nbsp;&nbsp;{profileDetails?.name}</div>
                 
                </div>
                <div className="checkout-address-item form-group">
                  <div className="title">Email to:</div>
                    <input type="email" id="check-email" className={`input-box  ${emailDisable ? " " : "disable"}`} defaultValue={profileDetails?.email} disabled={emailDisable} />
                    <button type="button" className="edit-btn" onClick={() => { setEmailDisable(false) }}>Edit</button>
                  
                </div>
                <div className="checkout-address-item">
                  <div className="title">Phone: </div>
                 
                    <input type="text" id="check-mobile" className={`input-box  ${mobDisable ? " " : "disable"}`} defaultValue={profileDetails?.mobile} disabled={mobDisable} />
                    <button type="button" className="edit-btn" onClick={() => { setMobDisable(false) }}>Edit</button>
                  
                </div>
                <div className="checkout-address-item">
                  <div className="title">Address: </div>
                  
                    <input type="text" id="check-address" className={`input-box  ${addressDisable ? " " : "disable"}`} defaultValue={profileDetails?.address} disabled={addressDisable} />
                    <button type="button" className="edit-btn" onClick={() => { setAddressDisable(false); }}>Edit</button>
                 
                </div>
              </div>
              <div className="checkout-bills">
                <h3 className="checkout-header">Your Order</h3>
                <table cellSpacing="0" className="cart-table">
                  <tbody>
                    {
                      cartData.map((item, index) => (
                        <tr className="cart-item" key={index}>
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
                              Qty: {item.qty}
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
                  </tbody>
                </table>
                <div className="divider"></div>
                <div className="order-summary">
                  <div className="order-data">
                    <div className="order-data-title">Items total</div>
                    <div>Rs.{item_total}</div>
                  </div>
                  <div className="order-data">
                    <div className="order-data-title">Delivery Charge</div>
                    <div>Rs.100</div>
                  </div>
                  <div className="order-data">
                    <div className="order-data-title">Total Payment</div>
                    <div>Rs.{item_total + Number(100)}</div>
                  </div>
                  <div className="order-data">
                    <div></div>
                    <div className="order-data-title" style={{ fontFamily: "MetropolisSB", fontSize: "1.05rem" }}>(Tax Inclusive*)</div>
                  </div>
                  <div className="divider"></div>
                  <button type="submit" className="btn btn-main place-order">Place Order</button>
                </div>
              </div>
              </form>
            </div>
          </>
            :
            <div id="no-items" className="alert-box">
              No Items Found in Cart
            </div>
        }


      </div>
    </section>
  )
}

export default Checkout