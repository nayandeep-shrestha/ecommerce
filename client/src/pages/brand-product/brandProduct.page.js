import "./brandProduct.css"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { brand_svc } from "../../components/admin/brand/brand.service"
import { Container } from "react-bootstrap"
import ProductCard from "../../components/product-card/productCard"

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
        <div className="product-filter">
          <h2 className="sub-title">Filters</h2>
        </div>
        <div className="productList-container">
          <div className="brand-header">
            <h2 className="sub-title">{brand?.title}</h2>
            <div className="toolbar-sorter sorter">
              <label className="sorter-label" htmlFor="sorter">Sort By</label>
              <select id="sorter" data-role="sorter" className="sorter-options">
                <option value="name">Name</option>
                <option value="high-low">Price high to low</option>
                <option value="low-high" >Price low to high</option>
              </select>
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