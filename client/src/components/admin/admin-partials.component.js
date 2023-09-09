import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import profile from "../../assets/images/profile.svg"
import {BiCategoryAlt, BiShoppingBag} from 'react-icons/bi'
import {FiShoppingCart} from "react-icons/fi"
import {HiOutlineUsers,HiOutlineBadgeCheck} from "react-icons/hi"
import {IoIosRibbon} from "react-icons/io"
import {useDispatch, useSelector} from "react-redux"
import { userStore } from "../../reducers/user.slicer"

export const AdminSidebar = () => {
    // let loggedInUser = JSON.parse(localStorage.getItem("user_data"))
    
    let loggedInUser = useSelector((state)=> {
        return state.user.userDetail
    })
    const sidebarToggle = (e) => {
        document.body.classList.toggle("sidebar-toggled");
        document.querySelector(".sidebar").classList.toggle("toggled");
        if (document.querySelector(".sidebar").classList.contains("toggled")) {
            document.querySelector('.sidebar .collapse').collapse('hide');
        };
    }
    return (<>
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* Sidebar - Brand */}
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to={"/" + loggedInUser?.role}>
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3" >{loggedInUser?.role} Panel</div>
            </NavLink>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            
            <li className="nav-item active">
                <NavLink className="nav-link" to={"/"}>
                    <i className="fas fa-fw fa-home"></i>
                    <span>Home</span></NavLink>
            </li>
            
            {/* Nav Item - Dashboard */}
            {/* <li className="nav-item active">
                <NavLink className="nav-link" to={"/"+loggedInUser?.role}>
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></NavLink>
            </li> */}

            {/* Divider */}
            <hr className="sidebar-divider" />

            {/* Heading */}
            <div className="sidebar-heading">
                Interface
            </div>

            {/* Nav Item - Banner Menu */}
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/banner" aria-expanded="true">
                    <IoIosRibbon className="fa-fw"/>
                    <span>Banner</span>
                </NavLink>
            </li>

            {/* Nav Item - Brand Menu */}
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/brand" aria-expanded="true">
                <HiOutlineBadgeCheck className="fa-fw"/>
                    <span>Brand</span>
                </NavLink>
            </li>

            {/* Nav Item - Category Menu */}
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/category">
                    <BiCategoryAlt className="fa-fw"/>
                    <span>Category</span>
                </NavLink>
            </li>

            {/* Nav Item - Product Menu */}
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/product">
                    <BiShoppingBag className="fa-fw"/>
                    <span>Product</span>
                </NavLink>
            </li>

            {/* Nav Item - Order Management Menu */}
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/order">
                    <FiShoppingCart className="fa-fw"/>
                    <span>Order Management</span>
                </NavLink>
            </li>
            
            {/* Nav Item - User Management Menu */}
            <li className="nav-item">
                <NavLink className="nav-link" to="/admin/user">
                    <HiOutlineUsers className="fa-fw"/>
                    <span>User Management</span>
                </NavLink>
            </li>
           
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={sidebarToggle}></button>
            </div>

        </ul>
    </>)
}

export const AdminFooter = () => {
    return (<>
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Your Website 2020</span>
                </div>
            </div>
        </footer>
    </>)
}

export const AdminTopbar = () => {
    //through store 
    let loggedInUser = useSelector((state)=> {
        return state.user.userDetail
    })

    const sidebarToggle = (e) => {
        document.body.classList.toggle("sidebar-toggled");
        document.querySelector(".sidebar").classList.toggle("toggled");
        if (document.querySelector(".sidebar").classList.contains("toggled")) {
            document.querySelector('.sidebar .collapse').collapse('hide');
        };
    }

    let navigate = useNavigate()
    let dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("user_data")
        localStorage.removeItem("user_token")
        dispatch(userStore({}));
        //localStorage.clear() =>> clear all data
        return navigate("/login")
    }

    return (<>
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* Sidebar Toggle (Topbar) */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={sidebarToggle}>
                <i className="fa fa-bars"></i>
            </button>

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <div className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{loggedInUser?.name}</span>
                        <img className="img-profile rounded-circle" src={profile} alt="DP" />
                    </div>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        {/* <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a> */}
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </button>
                    </div>
                </li>

            </ul>

        </nav>
    </>)
}
