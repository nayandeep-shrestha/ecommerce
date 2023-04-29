import React from "react"
import { useCallback, useEffect, useState } from "react"
import "./categories.css"
import { NavLink } from "react-router-dom"
import { category_svc } from "../../admin/category/category.service"

const Categories = () => {
    let [categories, setCategories] = useState();
    const getAllCategories = useCallback(async () => {
        try {
            let response = await category_svc.getAllList()
            if (response) {
                let active_categories = response.result.filter((item) => (item.status === 'active'))
                setCategories(active_categories)
            }
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        getAllCategories();
    }, [getAllCategories])
    return (
        <div className="row categories">
            <h2 className='sub-title'>Shop By Category</h2>
            {/* <NavLink className='see-all' to="#">View All <span className="arrow"><BsArrowRightShort size={25} /></span></NavLink> */}
            <div className="categories-container">
                {
                    categories && categories.map((item, index) => (
                        item.parent_id ? <></> :
                            <div className="categories-wrapper" key={index}>
                                <NavLink to={'/productCategory/' + item.slug} className="category-block" >
                                    <div className="category-detail">
                                        <div className="category-title">
                                            {item.name}
                                        </div>
                                        <div className="category-img">
                                            <img src={process.env.REACT_APP_IMAGE_URL + "/category/" + item.image} alt="" />
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories