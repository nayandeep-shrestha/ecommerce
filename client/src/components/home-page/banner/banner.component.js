import React, { useCallback, useState, useEffect } from "react";
import "./banner.css"
import { banner_svc } from "../../admin/banner/banner.service"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Keyboard, Autoplay } from "swiper";

const Banner = () => {
    let [banner, setBanner] = useState()
    const getBanners = useCallback(async () => {
        try {
            let result = await banner_svc.getAllList()
            if (result) {
                let activeBanner = result.result.filter((item) => item.status === 'active')
                setBanner(activeBanner)
            }
        } catch (e) {
            console.log(e)
        }
    }, [])
    useEffect(() => {
        getBanners()
    }, [getBanners])
    return (
        <Swiper
            cssMode={true}
            autoplay={{
                delay: 3500,
                pauseOnMouseEnter: true
            }}
            loop={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 4
            }}
            keyboard={true}
            modules={[Pagination, Keyboard, Autoplay]}
        >
            {
                banner && banner.map((item, index) => (
                    <SwiperSlide key={index}>
                        <a href={item.link}>
                        <img src={process.env.REACT_APP_IMAGE_URL + "/banner/" + item.image} alt='' className='banner-img' />
                        </a>
                    </SwiperSlide>
                ))

            }
        </Swiper>
    )
}

export default Banner