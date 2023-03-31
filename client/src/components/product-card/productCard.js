import './productCard.css'
import { NavLink } from "react-router-dom"
import NoImage from "../../assets/images/image-not-found.png"

const ProductCard = ({product}) => {
    // console.log(process.env.REACT_APP_IMAGE_URL+"/product/" +product.images)
    return (
        <div className="product-item">
            <div className="product-wrapper">
                <div className="product-label">
                    <NavLink className='link' to={`/product/${product.slug}`}>
                        <div className="product-img">
                            <img src={product.images[0] ? process.env.REACT_APP_IMAGE_URL+"/product/"+product.images[0] : NoImage}  alt="" width="154px" />
                            <span className="discount-flag">{product.discount > 0 ? product.discount+"%" : " "}</span>
                        </div>
                    </NavLink>
                </div>
                <div className="product-detail">
                    <div className="d-flex position-relative">
                        <NavLink className="product-title link" to={`/product/${product.slug}`}>{product.title}</NavLink>
                    </div>
                    <div className="product-price-list">
                        <span className="product-disPrice">Rs.{product.actual_price}</span>
                        <span className="product-price">{product.discount > 0 && "Rs." +product.price}</span>
                    </div>
                    <div className="product-cart">
                        <button className="cart-button">
                            <span className="cart-text">Add to cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard