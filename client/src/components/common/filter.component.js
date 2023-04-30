import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from "./common-components"
import { RangeSlider, InputGroup, InputNumber } from 'rsuite';
import "rsuite/dist/rsuite.css"
import './slider.css'

const Filter = ({category, product, brand}) => {
    let navigate = useNavigate()
    let [name, setName] = useState([])
    let [brandsName,setBrandsName] = useState([])
    let [catsName,setCatsName] = useState([])
    const [value, setValue] = useState([0, 250000]);
    const handleFilter = (e) => {
        e.preventDefault()
        let min = document.getElementById("min").value
        let max = document.getElementById("max").value
        if (name.length <= 0) {
            navigate(`/productCategory/${category?.slug}?min=${min}&max=${max}`)
        } else {
            navigate(`/productCategory/${category?.slug}?min=${min}&max=${max}&brand=${name[0]}`)
        }
    }
    const handleChange = ([...name])=>{
        console.log(name)
        // let min = document.getElementById("min").value
        // let max = document.getElementById("max").value
        // if(name){
        //   setName(name)
        //   navigate(`/productCategory/${category?.slug}?min=${min}&max=${max}&brand=${name[0]}`)
        // }else{
        //   setName([])
        //   navigate(`/productCategory/${category?.slug}?min=${min}&max=${max}`)
        // }
      }
    useEffect(()=>{
        setCatsName([])
        setBrandsName([])
    },[product])
    return (
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
                                    const [end] = value;
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
                                    const [start] = value;
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
                                {brand===false? "Brands": "Category"}
                            </h3>
                            <ul className="single-filter-list">
                                {
                                    product?.forEach((item) => {
                                        if(!brand){
                                            if (!brandsName.includes(item.brand.title)) {
                                                brandsName.push(item.brand.title)
                                            }
                                        }else if(!category){
                                            if (!catsName.includes(item.categories[0].name)) {
                                                catsName.push(item.categories[0].name)
                                            }
                                        }
                                    })
                                }
                                {
                                    brand === false? (
                                        brandsName.length > 0 && brandsName.map((title) => (
                                            <li className="filter-list-item">
                                                <Checkbox label={title} name={title.toLowerCase()} checked={false} handleChange={handleChange} />
                                            </li>
                                        ))
                                    )
                                    :
                                    (
                                        category === false &&  catsName.length > 0 && catsName.map((title) => (
                                            <li className="filter-list-item">
                                                <Checkbox label={title} name={title.toLowerCase()} checked={false} handleChange={handleChange} />
                                            </li>
                                        ))
                                    )
                                }
                            </ul>
                        </div>
                    </aside>
                    <span className="divider"></span>
                </aside>
            </form>
        </div>
    )
}

export default Filter