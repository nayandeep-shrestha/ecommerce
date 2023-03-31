import {NavLink} from "react-router-dom"
import visa from "../../assets/images/payment/visa.png"
import mastercard from "../../assets/images/payment/mastercard.png"
import esewa from "../../assets/images/payment/esewa.png"
import {BsFacebook, BsInstagram,BsWhatsapp} from "react-icons/bs"
import {AiOutlineCopyright} from "react-icons/ai"

import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row footer-container">
        <div className="col-md-3">
          <span className="footer-title">Contact Us</span>
          <ul className="footer-list">
            <li>TechShop, Kalanki-1</li>
            <li>Kathmandu, Nepal</li>
            <li style={{paddingTop: "1rem"}}>+9779861236946</li>
            <li style={{paddingTop: "1rem"}}>support@techshop.com</li>
          </ul>
        </div>
        <div className="col-md-3">
          <span className="footer-title">Information</span>
          <ul className="footer-list">
            <li>Privacy Policy</li>
            <li>Shipment Policy</li>
            <li>Return Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="col-md-3">
          <span className="footer-title">Quick Links</span>
          <ul className="footer-list">
            <li><NavLink to="#" className="footer-links">Smartphones</NavLink></li>
            <li><NavLink to="#" className="footer-links">Audio</NavLink></li>
            <li><NavLink to="#" className="footer-links">Laptops</NavLink></li>
            <li><NavLink to="#" className="footer-links">About Us</NavLink></li>
          </ul>
        </div>
        <div className="col-md-3">
          <span className="footer-title">We Accept</span>
          <div className="footer-payment">
            <div><img className="footer-payment-img" src={esewa} alt="esewa" /></div>
            <div><img className="footer-payment-img" src={visa} alt="visa" /></div>
            <div><img className="footer-payment-img" src={mastercard} alt="mastercard" /></div>
          </div>
        </div>
      </div>
      <div className="row footer-divider"></div>
      <div className="row footer-social">
        <span className="social-icon fb"><BsFacebook size={25} /></span>
        <span className="social-icon whats"><BsWhatsapp size={25} /></span>
        <span className="social-icon"><BsInstagram size={25} className="insta" /></span>
      </div>
      <div className="row footer-divider"></div>
      <div className="footer-copyright">
        Copyright <AiOutlineCopyright/> 2023 TechShop. All Rights Reserved 
      </div>
    </footer>
  )
}

export default Footer