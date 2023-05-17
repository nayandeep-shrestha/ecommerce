import React, { useState, useEffect, useCallback } from "react"
import "./categoryProduct.css"
import { useParams, useSearchParams } from "react-router-dom"
import { category_svc } from "../../components/admin/category/category.service"
import { Container } from "react-bootstrap"
import ProductCard from "../../components/product-card/productCard"
import Components from "../../components"
import {Sorter} from "../../components/common/common-components"

const CategoryProducts = () => {
  let params = useParams()
  let [query] = useSearchParams()
  let [category, setCategory] = useState()
  let [product, setProduct] = useState()
  let [filterProduct, setFilterProduct] = useState()
  const getCategoryData = useCallback(async () => {
    try {
      
      let response = await category_svc.getCategoryBySlug(params.slug)
      if (response) {
        setCategory(response.result.category)
        setProduct(response.result.products)
      }
    } catch (error) {
      console.error(error)
    }
  }, [params.slug])
  useEffect(() => {
    getCategoryData();
  }, [getCategoryData])
  useEffect(() => {
    if (query.get('min') && query.get('max')) {
      let filtered = product?.filter(item => item.actual_price >= query.get('min') && item.actual_price < query.get('max'))
      if (filtered) {
        setFilterProduct(filtered)
      } else {
        setFilterProduct(null)
      }
    }
  }, [query, product])
 
  return (
    <Container fluid>
      <div className="row category-products">
        <Components.Filter category={true} product={product} brand={false}/>
        <div className="productList-container">
          <div className="category-header">
            <h2 className="sub-title">{category?.name}</h2>
            <Sorter/>
          </div>
          <span className="divider"></span>
          <div className="productList-wrapper">
            {
              query.get('min') || query.get('max') ?
                (filterProduct?.length > 0 ?
                  <>
                    {
                      filterProduct.map((product, index) => (
                        <div className="" key={index}>
                          <ProductCard product={product} />
                        </div>
                      ))
                    }

                  </>
                  :
                  <>
                    <div className="alert-box" style={{ display: "block" }}>
                      No Products
                    </div>
                  </>)
                :
                (product?.length > 0 ?
                  <>
                    {
                      product.map((product, index) => (
                        <div className="" key={index}>
                          <ProductCard product={product} />
                        </div>
                      ))
                    }

                  </>
                  :
                  <>
                    NOT FOUND
                  </>)
            }
          </div>
        </div>
      </div>

    </Container>
  )
}

export default CategoryProducts