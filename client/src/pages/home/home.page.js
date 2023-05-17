import React from 'react'
import "./home.css"
import {TbReplace} from "react-icons/tb"
import Components from "../../components"

import service from "../../assets/images/services/service.png"
import secure from "../../assets/images/services/secure.png"
import support from "../../assets/images/services/support.png"
import price from "../../assets/images/services/price.png"
const HomePage = () => {
    return (<>
        <section className="container-fluid">
            <Components.HomeComponent.Banner />
            <div className="services">
                        <div className="services-wrapper">
                            <div className="services-inner">
                                <span><img src={service} alt="service" /></span>
                                <span className="service-title" style={{paddingTop:"4px"}}><h6>Free Shipping</h6></span>
                            </div>
                            <div className="services-inner">
                                <span><img src={secure} alt="secure" /></span>
                                <span className="service-title" style={{paddingTop:"4px"}}><h6>Secure Payment</h6></span>
                            </div>
                            <div className="services-inner">
                                <span><img src={support} alt="support" /></span>
                                <span className="service-title" style={{paddingTop:"4px"}}><h6>Support 24/7</h6></span>
                            </div>
                            <div className="services-inner">
                                <span><img src={price} alt="price" /></span>
                                <span className="service-title" style={{paddingTop:"4px"}}><h6>Affordable Price</h6></span>
                            </div>
                            <div className="services-inner">
                                <span><TbReplace size={33}/></span>
                                <span className="service-title" style={{paddingTop:"4px"}}><h6>Free 7 day replacement</h6></span>
                            </div>
                        </div>
                    </div>
             
            <Components.HomeComponent.Products />
            <Components.HomeComponent.Laptops />
            <Components.HomeComponent.Wearables />
            <Components.HomeComponent.Categories />
            <Components.HomeComponent.Brand />
        </section>
        </>
    )
}

export default HomePage