import { NavLink } from "react-router-dom"
import laptop from "../../assets/images/categories/computer.png"

const Orders = () => {
    
    return (
        <>
            <div className="col-sm-9">
                <header className="cart-header">
                    <h1>Orders</h1>
                </header>
                <div className="order-list">
                    <div className="order-filter">
                        <span className="order-filter-text">Show :</span>
                        <span className="order-filter-select">

                        </span>
                    </div>
                    <div className="orders">
                        <div className="order">
                            <div className="order-info">
                                <div className="order-info-left">
                                    <div className="order-info-1">Order #934857s903m</div>
                                    <p className="order-info-2" style={{ color: "#757575" }}>Placed on 17 Nov 2022 22:36:07</p>
                                </div>
                                <NavLink to="/" className="order-info-right">
                                    Manage
                                </NavLink>
                            </div>
                            <div className="order-item">
                                <table cellSpacing="0" className="cart-table">
                                    <tbody>
                                        <tr className="cart-item">
                                            <td className='item-thumb'>
                                                <NavLink to={"/products/"}>
                                                    {/* <img src={process.env.REACT_APP_IMAGE_URL + "/product/"} alt="" /> */}
                                                    <img src={laptop} alt="" />
                                                </NavLink>
                                            </td>
                                            <td className='item-name'>
                                                <NavLink to={"/products/"}>Keyboard sdagfsgdfgdf rfsgsfgdfsgfdv fghsfghestdjyuhfeds hgsdurfjdnfdijsahfnjuyerh ewuyaghfuy</NavLink>
                                            </td>
                                            <td className='item-quantity'>
                                                <div className="quantity">
                                                    Qty: 2
                                                </div>
                                            </td>
                                            <td className='item-status'>
                                                <span className="status">
                                                    Delivered
                                                </span>
                                            </td>
                                            <td className='item-deliveryDate'>
                                                Delivered on 17 Nov 2022
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders