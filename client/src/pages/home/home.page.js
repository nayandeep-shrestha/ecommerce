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
                                <span><img className="service-img" src={service} alt="service" /></span>
                                <span className="service-title" style={{}}>Free <br/>Shipping</span>
                            </div>
                            <div className="services-inner">
                                <span><img className="service-img" src={secure} alt="secure" /></span>
                                <span className="service-title" style={{}}>Secure <br/> Payment</span>
                            </div>
                            <div className="services-inner">
                                <span><img className="service-img" src={support} alt="support" /></span>
                                <span className="service-title" style={{}}>Support 24/7</span>
                            </div>
                            <div className="services-inner">
                                <span><img className="service-img" src={price} alt="price" /></span>
                                <span className="service-title" style={{}}>Affordable<br/> Price</span>
                            </div>
                            <div className="services-inner">
                                <span><TbReplace className="service-img" size={33}/></span>
                                <span className="service-title" style={{lineHeight: "16px"}}>Free 7 day <br/>replacement</span>
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