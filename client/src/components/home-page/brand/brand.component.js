import React,{ useCallback, useEffect, useState } from "react";
import "./brand.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { NavLink } from "react-router-dom";
import { brand_svc } from "../../admin/brand/brand.service";

const Brand = () => {
    let [brands, setBrand] = useState()
    const getBrands = useCallback(async () => {
        try {
            let result = await brand_svc.getAllList()
            if (result.status) {
                let activeBrands = result.result.filter((item) => item.status === 'active')
                setBrand(activeBrands)
            }
        }catch(e) {
            console.log(e)
        }
    }, [])
    useEffect(() => {
        getBrands()
    }, [])
    return (
        <div className="row brand">
            {/* <span className="divider"></span> */}
            <div className="brand-container">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation]}
                >
                    {
                        brands && brands.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="brand-logo">
                                    <NavLink to={"/brand-products/" + item.link}>
                                        <img src={process.env.REACT_APP_IMAGE_URL + "/brand/" + item.image} alt="LENOVO" />
                                    </NavLink>
                                </div>
                            </SwiperSlide>

                        ))
                    }
                </Swiper> 
            </div>
            {/* <span className="divider"></span> */}

        </div>
    )
}
export default Brand