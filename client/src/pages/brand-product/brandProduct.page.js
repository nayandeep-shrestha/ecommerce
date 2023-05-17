import React, { useState, useEffect, useCallback } from "react"
import "./brandProduct.css"
import { useParams } from "react-router-dom"
import { brand_svc } from "../../components/admin/brand/brand.service"
import { Container } from "react-bootstrap"
import ProductCard from "../../components/product-card/productCard"
import Components from "../../components"
import {Sorter} from "../../components/common/common-components"

const BrandProducts = () => {
  let params = useParams()
  let [brand, setBrand] = useState()
  let [product, setProduct] = useState()

  const getBrandData = useCallback(async () => {
    try {
      let response = await brand_svc.getBrandBySlug(params.slug)
      if (response) {
        setBrand(response.result.brand)
        setProduct(response.result.products)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    getBrandData();
  }, [])

  return (
    <Container fluid>
      <div className="row brand-products">
        <Components.Filter product={product} category={false} brand={true}/>
        <div className="productList-container">
          <div className="brand-header">
            <h2 className="sub-title">{brand?.title}</h2>
            <div className="toolbar-sorter sorter">
              <Sorter/>
            </div>
          </div>
          <span className="divider"></span>
          <div className="productList-wrapper">
                       {
                product ?
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
                  </>
              }
            </div>
          </div>
        </div>
      
    </Container>
  )
}

export default BrandProducts