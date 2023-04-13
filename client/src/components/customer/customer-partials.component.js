import { NavLink } from "react-router-dom"
import {FaUser, FaShoppingBasket} from 'react-icons/fa'
import {IoMdLogOut} from 'react-icons/io'
export const CustomerSideBar = () => {
    return (
        <nav className="account-navigation col-sm-3">
            <ul>
                <li>
                    <NavLink to="/customer/orders">My Profile <FaUser/></NavLink>
                </li>
                <li>
                    <NavLink to="/customer/orders" className="isActive">Orders <FaShoppingBasket/></NavLink>
                </li>
                <li>
                    <NavLink to="/customer/orders">Logout <IoMdLogOut/></NavLink>
                </li>
            </ul>
        </nav>
    )
}