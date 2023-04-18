import "./categoryProduct.css"
import { useState, useEffect, useCallback } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { category_svc } from "../../components/admin/category/category.service"
import { Container } from "react-bootstrap"
import ProductCard from "../../components/product-card/productCard"
import './slider.css'
import "rsuite/dist/rsuite.css"
import { RangeSlider, InputGroup, InputNumber } from 'rsuite';
import { Checkbox } from "../../components/common/common-components"
import Select from 'react-select'

const CategoryProducts = () => {
  let params = useParams()
  let [query] = useSearchParams()
  let navigate = useNavigate()
  let [isChecked, setIsChecked] = useState(false)
  const [value, setValue] = useState([0, 250000]);
  let [category, setCategory] = useState()
  let [product, setProduct] = useState()
  let [filterProduct, setFilterProduct] = useState()
  let[name, setName] = useState([])
  const options = [{ value: 'name', label: 'Name' },
  { value: 'price high to low', label: 'Price high to low' },
  { value: 'price low to high', label: 'Price low to high' }]
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
  }, [])
  useEffect(() => {
    if (query.get('min') && query.get('max')) {
      let filtered = product?.filter(item => item.actual_price >= query.get('min') && item.actual_price < query.get('max'))
      if (filtered) {
        setFilterProduct(filtered)
      } else {
        setFilterProduct(null)
      }
    }
  }, [query])
  const handleFilter = (e) => {
    e.preventDefault()
    let min = document.getElementById("min").value
    let max = document.getElementById("max").value
    if(name.length<=0){
      navigate(`/productCategory/smartphones?min=${min}&max=${max}`)
    }else{
      navigate(`/productCategory/smartphones?min=${min}&max=${max}&brand=${name[0]}`)
    }
  }
  const handleChange = ([...name])=>{
    console.log(name)
    let min = document.getElementById("min").value
    let max = document.getElementById("max").value
    if(name){
      setName(name)
      navigate(`/productCategory/smartphones?min=${min}&max=${max}&brand=${name[0]}`)
    }else{
      setName([])
      navigate(`/productCategory/smartphones?min=${min}&max=${max}`)
    }
  }
  return (
    <Container fluid>
      <div className="row category-products">
        <div className="product-filter">
          <form onSubmit={handleFilter} method="GET">
            <h2 className="sub-title">Filters</h2>
            <aside className="filter-sidebar">
              <aside className="price-filter filter-section">
                <h3 className="filter-title">
                  Price
                </h3>
                <RangeSlider
                  progress
                  value={value}
                  onChange={value => {
                    setValue(value);
                  }}
                  max={250000}
                />
                <InputGroup>
                  <InputNumber
                    id="min"
                    min={0}
                    max={250000}
                    value={value[0]}
                    onChange={nextValue => {
                      const [start, end] = value;
                      if (nextValue > end) {
                        return;
                      }
                      setValue([nextValue, end]);
                    }}
                  />
                  <InputGroup.Addon>to</InputGroup.Addon>
                  <InputNumber
                    id="max"
                    min={0}
                    max={250000}
                    value={value[1]}
                    onChange={nextValue => {
                      const [start, end] = value;
                      if (start > nextValue) {
                        return;
                      }
                      setValue([start, nextValue]);
                    }}
                  />
                </InputGroup>
                <button type="submit" className="btn btn-main">Filter</button>
              </aside>
              <span className="divider"></span>
              <aside className="filter-section">
                <div className="filter-list-box">
                  <h3 className="filter-title">
                    Brands
                  </h3>
                  <ul className="single-filter-list">
                    <li className="filter-list-item">
                      <Checkbox label="OnePlus" name="oneplus" checked={false} handleChange={handleChange} />
                    </li>
                    <li className="filter-list-item">
                      <Checkbox label="Samsung" name="samsung" checked={false} handleChange={handleChange} />
                    </li>
                    <li className="filter-list-item">
                      <Checkbox label="Xiaomi" name="xiaomi" checked={false} handleChange={handleChange} />
                    </li>
                  </ul>
                </div>
              </aside>
              <span className="divider"></span>
            </aside>
          </form>
        </div>
        <div className="productList-container">
          <div className="category-header">
            <h2 className="sub-title">{category?.name}</h2>
            <label className="sorter-label" htmlFor="sorter">Sort By:
              <Select
                name="sorter"
                options={options}
                className="select"
              /></label>
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