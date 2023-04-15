import { NavLink } from "react-router-dom"
import laptop from "../../assets/images/categories/computer.png"
import { useCallback, useEffect, useState } from "react"
import { order_svc } from "../../services/order.service"

const Orders = () => {
    let [orderDetails, setOrderDetails] = useState()
    const getOrderList = useCallback(async () => {
        try {
            let orderList = await order_svc.getOrderListByUser()
            if (orderList.status) {
                setOrderDetails(orderList.result)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(() => {
        getOrderList()
    }, [])
    return (
        <>
            <div className="col-sm-9">
                <header className="cart-header">
                    <h1>Orders</h1>
                </header>
                {
                    orderDetails ? <>
                        <div className="order-list">
                            <div className="order-filter">
                                <span className="order-filter-text">Show :</span>
                                <span className="order-filter-select">

                                </span>
                            </div>
                            <div className="orders">
                                {
                                    orderDetails.map((order, index) => (
                                        <div className="order" key={index}>
                                            <div className="order-info">
                                                <div className="order-info-left">
                                                    <div className="order-info-1">Order #{order._id}</div>
                                                    <p className="order-info-2" style={{ color: "#757575" }}>Placed on {order?.createdAt}</p>
                                                </div>
                                                <NavLink to="/" className="order-info-right">
                                                    Manage
                                                </NavLink>
                                            </div>
                                            {
                                                order.cart.map((item, index) => (
                                                    <div className="order-item" key={index}>
                                                        <table cellSpacing="0" className="cart-table">
                                                            <tbody>
                                                                <tr className="cart-item">
                                                                    <td className='item-thumb'>
                                                                        <NavLink to={"/products/"}>
                                                                            <img src={process.env.REACT_APP_IMAGE_URL + "/product/" + item.product_image} alt="" />
                                                                            {/* <img src={laptop} alt="" /> */}
                                                                        </NavLink>
                                                                    </td>
                                                                    <td className='item-name'>
                                                                        <NavLink to={"/products/"}>{item.product_name}</NavLink>
                                                                    </td>
                                                                    <td className='item-quantity'>
                                                                        <div className="quantity">
                                                                            Qty: {item.qty}
                                                                        </div>
                                                                    </td>
                                                                    <td className='item-status'>
                                                                        <span className="status">
                                                                            {order.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className='item-deliveryDate'>
                                                                        {
                                                                            order.status === 'Delivered' ? 'Delivered on 17 Nov 2022' : " "
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                ))
                                            }
                                        </div>

                                    ))
                                }
                            </div>
                        </div>

                    </> : <>
                        <div id="no-item" className="alert-box" style={{ display: "block" }}>
                            No order has been made yet
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Orders