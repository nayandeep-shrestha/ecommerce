import './products.css'
import { NavLink } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import { category_svc } from "../../admin/category/category.service"
import ProductCard from "../../product-card/productCard"
import { BsArrowRightShort } from "react-icons/bs"

const Wearables = () => {
    let [product, setProduct] = useState()

    const getWearables = useCallback(async () => {
        try {
            let response = await category_svc.getCategoryBySlug("wearables")
            if (response) {
                setProduct(response.result.products)
            }
        } catch (error) {
            console.error(error)
        }
    }, [])
    useEffect(() => {
        getWearables();
    }, [getWearables])
    return (
        <div className="row products">
            <h2 className='sub-title'>Wearables</h2>
            <NavLink className='see-all' to="#">View All<span className="arrow"><BsArrowRightShort size={25} /></span></NavLink>
            <div className="product-container">
                {
                    product ?
                        <>
                            {
                                product.slice(0, 6).map((product, index) => (
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
    )
}

export default Wearables