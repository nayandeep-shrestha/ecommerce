import "./categoryProduct.css"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { category_svc } from "../../components/admin/category/category.service"
import { Container } from "react-bootstrap"
import ProductCard from "../../components/product-card/productCard"

const CategoryProducts = () => {
  let params = useParams()
  let [category, setCategory] = useState()
  let [product, setProduct] = useState()

  const getCategoryData = useCallback(async () => {
    try {
      let response = await category_svc.getCategoryBySlug(params.slug)
      if (response) {
        // console.log(response)
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

  return (
    <Container fluid>
      <div className="row category-products">
        <div className="product-filter">
          <h2 className="sub-title">Filters</h2>
        </div>
        <div className="productList-container">
          <div className="category-header">
            <h2 className="sub-title">{category?.name}</h2>
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

export default CategoryProducts