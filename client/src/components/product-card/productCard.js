import './productCard.css'
import { NavLink } from "react-router-dom"
import ReactStars from "react-rating-stars-component";
import NoImage from "../../assets/images/image-not-found.png"
import { AiFillHeart } from "react-icons/ai"
const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.3)",
        activeColor: "tomato",
        value: 3,
        isHalf: true,
    }
    // console.log(process.env.REACT_APP_IMAGE_URL+"/product/" +product.images)
    return (
        <div className="product-item">
            <div className="product-wrapper">
                <div className="product-label">

                    <NavLink className='link' to={`/products/${product._id}`}>
                        <div className="product-img">

                            <img src={product.images[0] ? process.env.REACT_APP_IMAGE_URL + "/product/" + product.images[0] : NoImage} alt="" width="154px" />
                            <span className="discount-flag">{product.discount > 0 ? product.discount + "%" : " "}</span>
                        </div>
                    </NavLink>
                </div>
                <div className="product-detail">
                    <div className="d-flex position-relative">
                        <NavLink className="product-title link" to={`/products/${product._id}`}>{product.title}</NavLink>
                    </div>
                    <div className="product-rating">
                        <ReactStars {...options} /> <span className='product-reviews'> (20) </span>
                    </div>
                    <div className="product-price-list">
                        <span className="product-disPrice">Rs.{product.actual_price}</span>
                        <span className="product-price">{product.discount > 0 && "Rs." + product.price}</span>
                    </div>
                    <div className="product-cart">
                        <a href='/' className="product-wishlist">

                            <AiFillHeart size={20} />
                        </a>
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