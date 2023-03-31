import "./brand.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
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
                    className="mySwiper"
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
                    {/* <SwiperSlide>
                        <div className="brand-logo">
                            <img src={samsung} alt="SAMSUNG" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-logo">
                            <img src={oneplus} alt="ONEPLUS" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-logo">
                            <img src={apple} alt="APPLE" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-logo">
                            <img src={xiaomi} alt="Xiaomi" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-logo">
                            <img src={dell} alt="DELL" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-logo">
                            <img src={jbl} alt="JBL" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-logo">
                            <img src={sony} alt="SONY" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-logo">
                            <img src={acer} alt="ACER" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="brand-logo">
                            <img src={beats} alt="BEATS" />
                        </div>
                    </SwiperSlide> */}
                </Swiper> 
            </div>
            {/* <span className="divider"></span> */}

        </div>
    )
}
export default Brand