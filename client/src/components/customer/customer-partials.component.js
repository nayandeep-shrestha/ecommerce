import React from "react"
import { NavLink } from "react-router-dom"
import {FaUser, FaShoppingBasket} from 'react-icons/fa'
import {IoMdLogOut} from 'react-icons/io'

export const CustomerSideBar = () => {
    return (
        <nav className="account-navigation col-sm-3">
            <ul>
                <li>
                    <NavLink to="/customer/profile">My Profile <FaUser className="icon" size={20}/></NavLink>
                </li>
                <li>
                    <NavLink to="/customer/orders">Orders <FaShoppingBasket className="icon" size={22}/></NavLink>
                </li>
                <li>
                    <NavLink to="/customer/logout">Logout <IoMdLogOut className="icon" size={25}/></NavLink>
                </li>
            </ul>
        </nav>
    )
}