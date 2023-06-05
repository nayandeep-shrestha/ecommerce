import './products.css'
import { NavLink } from "react-router-dom"
import React, { useState, useEffect, useCallback } from "react"
import { category_svc } from "../../admin/category/category.service"
import ProductCard from "../../product-card/productCard"
import { BsArrowRightShort } from "react-icons/bs"

const Laptops = () => {
  let [product, setProduct] = useState()

  const getLaptops = useCallback(async () => {
    try {
      let response = await category_svc.getCategoryBySlug("laptops")
      console.log(response)
      if (response) {
        setProduct(response.result.products)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])
  useEffect(() => {
    getLaptops();
  }, [getLaptops])
  return (
    <div className="row products">
      <span className='wrap-title'>
        <h2 className='sub-title'>Laptops</h2> <span className="vertical_divider"></span>
        <NavLink className='see-all' to="#">View All<span className="arrow"><BsArrowRightShort size={25} /></span></NavLink>
      </span>
      <div className="product-container">
        {
          product ?
            <>
              {
                product.slice(0, 5).map((product, index) => (
                    <ProductCard product={product} key={index} />                  
                ))
              }

            </>
            :
            <>
              NOT FOUND
            </>
        }
      </div>
    </div>
  )
}

export default Laptops