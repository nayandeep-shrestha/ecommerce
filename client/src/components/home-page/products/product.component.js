import "./products.css"
import { NavLink } from "react-router-dom"
import smartphones from "../../../assets/images/categories/smartphones.png"

const Products = () => {
    return (
        <div className="row products">
            <h2 className='sub-title' style={{border:"none"}}>Popular Products</h2>
            {/* <NavLink className='see-all' to="#">View All<span className="arrow"><BsArrowRightShort size={25} /></span></NavLink> */}
            <div className="product-container">
                <div className="product-item">
                    <div className="product-wrapper">
                        <div className="product-label">
                            <NavLink className='link' to="#">
                                <div className="product-img">
                                    <img src={smartphones} alt="" width="154px" />
                                    <span className="discount-flag">20%</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="product-detail">
                            <div className="d-flex position-relative">
                                <NavLink className="product-title link">Samsung Galaxy S23 Ultra</NavLink>
                            </div>
                            <div className="product-price-list">
                                <span className="product-disPrice">Rs. 1,20,000</span>
                                {/* <span className="product-discount">20% off</span> */}
                                <span className="product-price">Rs. 1,50,000</span>
                            </div>
                            <div className="product-cart">
                                <button className="cart-button">
                                    <span className="cart-text">Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-wrapper">
                        <div className="product-label">
                            <NavLink className='link' to="#">
                                <div className="product-img">
                                    <img src={smartphones} alt="" width="154px" />
                                    <span className="discount-flag">20%</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="product-detail">
                            <div className="d-flex position-relative">
                                <NavLink className="product-title link">Samsung Galaxy S23 Ultra</NavLink>
                            </div>
                            <div className="product-price-list">
                                <span className="product-disPrice">Rs. 1,20,000</span>
                                {/* <span className="product-discount">20% off</span> */}
                                <span className="product-price">Rs. 1,50,000</span>
                            </div>
                            <div className="product-cart">
                                <button className="cart-button">
                                    <span className="cart-text">Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-wrapper">
                        <div className="product-label">
                            <NavLink className='link' to="#">
                                <div className="product-img">
                                    <img src={smartphones} alt="" width="154px" />
                                    <span className="discount-flag">20%</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="product-detail">
                            <div className="d-flex position-relative">
                                <NavLink className="product-title link">Samsung Galaxy S23 Ultra</NavLink>
                            </div>
                            <div className="product-price-list">
                                <span className="product-disPrice">Rs. 1,20,000</span>
                                {/* <span className="product-discount">20% off</span> */}
                                <span className="product-price">Rs. 1,50,000</span>
                            </div>
                            <div className="product-cart">
                                <button className="cart-button">
                                    <span className="cart-text">Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-wrapper">
                        <div className="product-label">
                            <NavLink className='link' to="#">
                                <div className="product-img">
                                    <img src={smartphones} alt="" width="154px" />
                                    <span className="discount-flag">20%</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="product-detail">
                            <div className="d-flex position-relative">
                                <NavLink className="product-title link">Samsung Galaxy S23 Ultra</NavLink>
                            </div>
                            <div className="product-price-list">
                                <span className="product-disPrice">Rs. 1,20,000</span>
                                {/* <span className="product-discount">20% off</span> */}
                                <span className="product-price">Rs. 1,50,000</span>
                            </div>
                            <div className="product-cart">
                                <button className="cart-button">
                                    <span className="cart-text">Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-wrapper">
                        <div className="product-label">
                            <NavLink className='link' to="#">
                                <div className="product-img">
                                    <img src={smartphones} alt="" width="154px" />
                                    <span className="discount-flag">20%</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="product-detail">
                            <div className="d-flex position-relative">
                                <NavLink className="product-title link">Samsung Galaxy S23 Ultra</NavLink>
                            </div>
                            <div className="product-price-list">
                                <span className="product-disPrice">Rs. 1,20,000</span>
                                {/* <span className="product-discount">20% off</span> */}
                                <span className="product-price">Rs. 1,50,000</span>
                            </div>
                            <div className="product-cart">
                                <button className="cart-button">
                                    <span className="cart-text">Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-wrapper">
                        <div className="product-label">
                            <NavLink className='link' to="#">
                                <div className="product-img">
                                    <img src={smartphones} alt="" width="154px" />
                                    <span className="discount-flag">20%</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="product-detail">
                            <div className="d-flex position-relative">
                                <NavLink className="product-title link">Samsung Galaxy S23 Ultra</NavLink>
                            </div>
                            <div className="product-price-list">
                                <span className="product-disPrice">Rs. 1,20,000</span>
                                {/* <span className="product-discount">20% off</span> */}
                                <span className="product-price">Rs. 1,50,000</span>
                            </div>
                            <div className="product-cart">
                                <button className="cart-button">
                                    <span className="cart-text">Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products