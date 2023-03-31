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
            <li className="nav-item active">
                <NavLink className="nav-link" to={"/"+loggedInUser?.role}>
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></NavLink>
            </li>

            {/* Divider */}
            <hr className="sidebar-divider" />

            {/* Heading */}
            <div className="sidebar-heading">
                Interface
            </div>

            {/* Nav Item - Banner Menu */}
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="#" 
               data-toggle="collapse" data-target="#collapseTwo" 
                    aria-expanded="true" aria-controls="collapseTwo">
                    <IoIosRibbon className="fa-fw"/>
                    <span>Banner</span>
                </NavLink>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <NavLink className="sub-section" to="/admin/banner">Banner List</NavLink>
                        <NavLink className="sub-section" to="/admin/banner/create">Banner Create</NavLink>
                    </div>
                </div>
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
                <NavLink className="nav-link" to="#">
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
    // let loggedInUser = localStorage.getItem("user_data")
    // loggedInUser = JSON.parse(loggedInUser)


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
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{loggedInUser?.name}</span>
                        <img className="img-profile rounded-circle" src={profile} alt="DP" />
                    </a>
                    {/* Dropdown - User Information */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
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
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/login" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>

            </ul>

        </nav>
    </>)
}

//  {/* Nav Item - Alerts */}
//  <li className="nav-item dropdown no-arrow mx-1">
//  <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
//      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//      <i className="fas fa-bell fa-fw"></i>
//      {/* Counter - Alerts */}
//      <span className="badge badge-danger badge-counter">3+</span>
//  </a>
//  {/* Dropdown - Alerts */}
//  <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
//      aria-labelledby="alertsDropdown">
//      <h6 className="dropdown-header">
//          Alerts Center
//      </h6>
//      <a className="dropdown-item d-flex align-items-center" href="#">
//          <div className="mr-3">
//              <div className="icon-circle bg-primary">
//                  <i className="fas fa-file-alt text-white"></i>
//              </div>
//          </div>
//          <div>
//              <div className="small text-gray-500">December 12, 2019</div>
//              <span className="font-weight-bold">A new monthly report is ready to download!</span>
//          </div>
//      </a>
//      <a className="dropdown-item d-flex align-items-center" href="#">
//          <div className="mr-3">
//              <div className="icon-circle bg-success">
//                  <i className="fas fa-donate text-white"></i>
//              </div>
//          </div>
//          <div>
//              <div className="small text-gray-500">December 7, 2019</div>
//              $290.29 has been deposited into your account!
//          </div>
//      </a>
//      <a className="dropdown-item d-flex align-items-center" href="#">
//          <div className="mr-3">
//              <div className="icon-circle bg-warning">
//                  <i className="fas fa-exclamation-triangle text-white"></i>
//              </div>
//          </div>
//          <div>
//              <div className="small text-gray-500">December 2, 2019</div>
//              Spending Alert: We've noticed unusually high spending for your account.
//          </div>
//      </a>
//      <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
//  </div>
// </li>

// {/* Nav Item - Messages */}
// <li className="nav-item dropdown no-arrow mx-1">
//  <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
//      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//      <i className="fas fa-envelope fa-fw"></i>
//      {/* Counter - Messages */}
//      <span className="badge badge-danger badge-counter">7</span>
//  </a>
//  {/* Dropdown - Messages */}
//  <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
//      aria-labelledby="messagesDropdown">
//      <h6 className="dropdown-header">
//          Message Center
//      </h6>
//      <a className="dropdown-item d-flex align-items-center" href="#">
//          <div className="dropdown-list-image mr-3">
//              <img className="rounded-circle" src="img/undraw_profile_1.svg"
//                  alt="..." />
//              <div className="status-indicator bg-success"></div>
//          </div>
//          <div className="font-weight-bold">
//              <div className="text-truncate">Hi there! I am wondering if you can help me with a
//                  problem I've been having.</div>
//              <div className="small text-gray-500">Emily Fowler · 58m</div>
//          </div>
//      </a>
//      <a className="dropdown-item d-flex align-items-center" href="#">
//          <div className="dropdown-list-image mr-3">
//              <img className="rounded-circle" src="img/undraw_profile_2.svg"
//                  alt="..." />
//              <div className="status-indicator"></div>
//          </div>
//          <div>
//              <div className="text-truncate">I have the photos that you ordered last month, how
//                  would you like them sent to you?</div>
//              <div className="small text-gray-500">Jae Chun · 1d</div>
//          </div>
//      </a>
//      <a className="dropdown-item d-flex align-items-center" href="#">
//          <div className="dropdown-list-image mr-3">
//              <img className="rounded-circle" src="img/undraw_profile_3.svg"
//                  alt="..." />
//              <div className="status-indicator bg-warning"></div>
//          </div>
//          <div>
//              <div className="text-truncate">Last month's report looks great, I am very happy with
//                  the progress so far, keep up the good work!</div>
//              <div className="small text-gray-500">Morgan Alvarez · 2d</div>
//          </div>
//      </a>
//      <a className="dropdown-item d-flex align-items-center" href="#">
//          <div className="dropdown-list-image mr-3">
//              <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
//                  alt="..." />
//              <div className="status-indicator bg-success"></div>
//          </div>
//          <div>
//              <div className="text-truncate">Am I a good boy? The reason I ask is because someone
//                  told me that people say this to all dogs, even if they aren't good...</div>
//              <div className="small text-gray-500">Chicken the Dog · 2w</div>
//          </div>
//      </a>
//      <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
//  </div>
// </li>
