import { useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { product_svc } from "../../services/product.service"
import { resetCart } from "../../reducers/cart.slicer"
import "./checkout.css"

const Checkout = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const cart = useSelector((store) => {
    return store.cart.cartDetail
  })
  const placeOrder = async () => {
    try {
      if (cart && cart.length > 0) {
        let response = await product_svc.createOrder({
          "cart": cart,
          "discount": 0,
          "delivery_charge": 100,
          "is_paid": false
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
  }, [])
  return (
    <section className='container-fluid'>
      <div className="cart-container">
        <header className="cart-header"><h1>Checkout</h1></header>
        <div id="no-items" className="alert-box">
          No Items Found in Cart
        </div>
        <div className="checkout-wrapper">
          <div className="checkout-address"></div>
          <div className="checkout-bills"></div>
        </div>
        <button type="submit" onClick={placeOrder}>Place Order</button>
      </div>
    </section>
  )
}

export default Checkout