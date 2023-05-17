import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FiHeart, FiShare2 } from "react-icons/fi"
import { product_svc } from "../../components/admin/product/product.service"
import "./productDetail.css"
import {useDispatch} from "react-redux"
import {setDetail} from "../../reducers/cart.slicer"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReactStars from "react-rating-stars-component";
import ReactImageMagnify from 'react-image-magnify';

const ProductDetail = () => {
  let [productDetail, setProductDetail] = useState();
  let params = useParams()
  const getProductById = useCallback(async () => {
    try {
      let response = await product_svc.getById(params.id)
      if (response.result) {
        setProductDetail(response.result)
      }
    } catch (excep) {
      console.log(excep)
    }
  }, [params.id])
  useEffect(() => {
    getProductById();
  }, [getProductById])

  let [thumbsSwiper, setThumbsSwiper] = useState(null);
  let [quantity, setQuantity] = useState(1)
  let [incBtn, setIncBtn] = useState()
  let [decBtn, setDecBtn] = useState()
  let decrease = () => {
    if (quantity > 1) {
      setQuantity(Number(quantity) - 1)
    }
  }
  let increase = () => {
    if (quantity < 10) {
      setQuantity(Number(quantity) + 1)
    }
  }
  useEffect(() => {
    if (Number(quantity) === 1) {
      setDecBtn(true)
    } else if (Number(quantity) === 10) {
      setIncBtn(true)
    } else {
      setDecBtn(false)
      setIncBtn(false)
    }
  }, [quantity])

  let handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      if (e.target.value <= 10)
        setQuantity(e.target.value)
    }
  }
  let dispatch = useDispatch()
  const addToCart = (e) => {
    e.preventDefault()
    let currentProduct ={
      product_id: productDetail._id,
      name: productDetail.title,
      quantity: quantity
    }
    dispatch(setDetail(currentProduct))
  }
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.3)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 3.5,
    isHalf: true,
  }
  return (
    <>
      <section className='container-fluid'>
        <div className="productDetail">
          <div className="product-meta">
            <div className="product-media" >
              <div className="media-image">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  centeredSlides={true}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {
                    productDetail && productDetail.images.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ReactImageMagnify {...{
                          smallImage: {
                            alt: productDetail.title,
                            width: 350,
                            height: 350,
                            src: process.env.REACT_APP_IMAGE_URL + "/product/" + item
                          },
                          largeImage: {
                            src: process.env.REACT_APP_IMAGE_URL + "/product/" + item,
                            width: 900,
                            height: 1000
                          },
                          enlargedImagePortalId: "test",
                          className: "magnify-img",
                          enlargedImageContainerClassName: "enlarged-image"
                        }} />
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
              <div className="media-thumbs">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiperThumb"
                >
                  {
                    productDetail && productDetail.images.map((item, index) => (
                      <SwiperSlide key={index}>
                        <img src={process.env.REACT_APP_IMAGE_URL + "/product/" + item} alt={productDetail.item} width={"80px"} height="80px"/>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
            </div>
            <div className="product-info-main" >
              <div className="product-info">
                <h1>{productDetail?.title}</h1>
                <div className="product-info-rating">
                  <div className="single-rating">
                    <ReactStars {...options} /> <span className='product-reviews'> (20) </span>
                  </div>
                  <div className="share-wishlist">
                    <FiShare2 size={28} /> <FiHeart size={28} />
                  </div>
                </div>
                <div className="product-brand">Brand: <NavLink to={"/brand-products/" + productDetail?.brand?.title}>{productDetail?.brand?.title}</NavLink></div>
              </div>
              <div className="divider"></div>
              <div className="product-price-list">
                <span className="product-disPrice">Rs. {productDetail?.actual_price}</span>
                <span className="product-price">{productDetail?.discount > 0 && "Rs." + productDetail?.price}</span>
                <span className="product-discount">Now 10% off </span>
              </div>
              <div className="divider"></div>
              {/* <div className="product-color-choose">
                <h5>Choose a Color</h5>
                <div className="product-color-wrapper">
                  <div className="single-color"></div>
                  <div className="single-color"></div>
                  <div className="single-color"></div>
                </div>
              </div> */}
              <div className="product-quantity">
                <div className="quantity-selector">
                  <button type="button" className="quantity-dec" disabled={decBtn} onClick={decrease}>-</button>
                  <input type="text" min="1" max="10" value={quantity} className="quantity-num" autoComplete="off" onChange={handleChange} />
                  <button type="button" className="quantity-inc" disabled={incBtn} onClick={increase}>+</button>
                </div>
                {
                  productDetail?.stock <= 15 ? <>
                    <div className="product-stock">
                      Only <span className="stock-num"> {productDetail.stock} items </span> Left!
                    </div>
                  </>
                    :
                    <>
                    {productDetail?.stock === 0 ? <>Out of Stock</> :<>In Stock</>}
                    </>
                }
              </div>
              <div className="product-cart-buy">
                <button className="buy-now btn">Buy Now</button>
                <form onSubmit={addToCart} >

                <button type="submit" className="add-to-cart btn-main btn" >Add to Cart</button>
                </form>
              </div>
              <div id="test"></div>
            </div>
          </div>
        </div>
        <div className="description-reviews">
          <Tabs
            defaultActiveKey="description"
            className="mb-3 tabs-container "
          >
            <Tab eventKey="description" title="Description" tabClassName="single-tab">
                <div  dangerouslySetInnerHTML={{__html: productDetail?.description}}></div>
            </Tab>
            <Tab eventKey="reviews" title="Reviews" tabClassName="single-tab">

            </Tab>

          </Tabs>
        </div>
      </section>
    </>
  )
}

export default ProductDetail