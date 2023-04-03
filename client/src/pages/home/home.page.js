import { Container } from "react-bootstrap"
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
                <div className="row">
                    <div className="col-12">
                        <div className="services-wrapper">
                            <div className="row services-inner">
                                <div className="col-md-6" style={{marginRight: "-1.3rem"}}><img src={service} alt="" /></div>
                                <div className="col-md-6"><h6>Free Shipping</h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6" style={{marginRight: "-1.3rem"}}><img src={secure} alt="" /></div>
                                <div className="col-md-6"><h6>Secure Payment</h6>  </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6" style={{marginRight: "-1.3rem"}}><img src={support} alt="" /></div>
                                <div className="col-md-6"><h6>Support 24/7</h6>    </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6" style={{marginRight: "-1.3rem"}}><img src={price} alt="" /></div>
                                <div className="col-md-6"><h6>Affordable price</h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6" style={{marginRight: "-1.3rem"}}><TbReplace size={33}/></div>
                                <div className="col-md-6"><h6>Free 7 day replacement</h6></div>
                            </div>
                        </div>
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