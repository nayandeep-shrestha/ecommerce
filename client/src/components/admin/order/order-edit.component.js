import { useState, useCallback, useEffect } from "react"
import Breadcrumb from "../breadcumb.component"
import { useSelector } from "react-redux"
import { order_svc } from "../../../services/order.service"
import { NavLink, useParams } from "react-router-dom"

const OrderEdit = () => {
    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })
    let params = useParams()
    let [orderDetails, setOrderDetails] = useState()
    const getOrderDetails = useCallback(async () => {
        try {
            let details = await order_svc.getOrderDetailsById(params.id)
            if (details.status) {
                setOrderDetails(details.result)
                console.log(orderDetails)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleUpdate = () =>{
        
    }
    useEffect(() => {
        getOrderDetails()
    }, [])
    return (<>
        <div className="container-fluid">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h3 className="mb-2">Order Details</h3>
                <Breadcrumb role={loggedInUser?.role} title="edit" section="product" />
            </div>
            <div className="row">
                <div className="col">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row justify-content-center">
                                <div className="col p-4">
                                    <h4 className="mb-4 ml-5 text-dark">
                                        Order &nbsp;
                                        <span style={{ fontSize: "17px" }}>#{params.id}</span>
                                        <button className="btn orderUpdate" onSubmit={handleUpdate}>Update</button>    
                                    </h4>
                                    <hr className="mb-4" />
                                    <div className="orderDetails">
                                        <div className="col-sm-5">
                                            <div className="orderSubHead">
                                                General
                                            </div>
                                            <div className="detailSingle">
                                                <span className="detailsTitle">Date Created:</span>
                                                <span> &nbsp;&nbsp;{orderDetails?.createdAt.split('T')[0]} </span>
                                            </div>
                                            <div className="detailSingle">
                                                <label htmlFor="orderStatus" className="detailsTitle">Status:&nbsp;&nbsp;</label>
                                                <select name="orderStatus" id="orderStatus">
                                                    <option value="processing" selected={orderDetails?.status === "processing" ? "selected" : ""}>Processing</option>
                                                    <option value="delivered" selected={orderDetails?.status === "delivered" ? "selected" : ""}>Delivered</option>
                                                    <option value="cancelled" selected={orderDetails?.status === "cancelled" ? "selected" : ""}>Cancelled</option>
                                                </select>
                                            </div>
                                            <div className="detailSingle">
                                                <span className="detailsTitle">Customer: &nbsp;&nbsp;</span>
                                                <span>{orderDetails?.user_id.name}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="orderSubHead">
                                                Billing
                                            </div>
                                            <div className="detailSingle">
                                                <span className="detailsTitle">Address: &nbsp;&nbsp;</span>
                                                <span>{orderDetails?.shipping.address}</span>
                                            </div>
                                            <div className="detailSingle">
                                                <span className="detailsTitle">Email: &nbsp;&nbsp;</span>
                                                <span>{orderDetails?.shipping.email}</span>
                                            </div>
                                            <div className="detailSingle">
                                                <span className="detailsTitle">Phone: &nbsp;&nbsp;</span>
                                                <span>{orderDetails?.shipping.mobile}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mb-4" />
                                    <table cellSpacing="0" className="item-table">
                                        <thead>
                                            <th></th>
                                            <th>Item</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </thead>
                                        <tbody>
                                            {
                                                orderDetails?.cart.map((item, index) => (
                                                    <tr className="cart-item" key={index}>
                                                        <td className='item-thumb'>
                                                            <NavLink to={"/products/" + item.product_id}>
                                                                <img src={process.env.REACT_APP_IMAGE_URL + "/product/" + item.product_image} alt="" />
                                                            </NavLink>
                                                        </td>
                                                        <td className='item-name'>
                                                            <NavLink to={"/products/" + item.product_id}>{item.product_name}</NavLink>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
}
export default OrderEdit