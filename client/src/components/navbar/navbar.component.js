import React, { useCallback, useEffect, useState } from "react"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { category_svc } from "../admin/category/category.service"
import { userStore } from "../../reducers/user.slicer"
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector } from "react-redux"
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai"
import { BsSearch, BsCart3 } from "react-icons/bs"
import { IoIosArrowDown } from "react-icons/io"
import "./navbar.css"
import Logo from "../../assets/images/logo/logo.png"
import OffCanvas from "../common/off-canvas.component"

const NavBar = () => {
    let [keyword, setKeyword] = useState();
    const [query, setQuery] = useSearchParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const loggedInUser = useSelector((state) => {
        return state.user.userDetail;
    })
    const cartCount = useSelector((state) => {
        let cart = state.cart.cartDetail
        let quantity = 0
        if (cart && cart.length) {
            cart.forEach((item) => {
                quantity += Number(item.quantity)
            })
        }
        return quantity
    })
    const handleChange = (e) => {
        setKeyword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(keyword);
        if (keyword === undefined) {
            navigate(`/search?q=`);
        } else {
            navigate(`/search?q=${keyword}`);
        }
    }
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem("user_data")
        localStorage.removeItem("user_token")
        dispatch(userStore({}));
        //localStorage.clear() =>> clear all data
        navigate("/login")
    }
    let [categories, setCategories] = useState();
    let [sub_categories, setSub_categories] = useState();
    const getAllCategories = useCallback(async () => {
        try {
            let response = await category_svc.getAllList()
            if (response) {
                let active_categories = response.result.filter((item) => (item.status === 'active'))
                setCategories(active_categories)
                setSub_categories(response.result.filter((item) => (item.parent_id !== null && item.status === 'active')));
                // console.log(sub_categories)
            }
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        getAllCategories();
    }, [getAllCategories])

    return (<>
        <header className="site-header">
            <div className="master-header">
                <div className="header-top">
                    <span className="header-logo">
                        <NavLink className="header-logo-link" to="/">
                            <img src={Logo} alt="TechShop" className="logo" />
                        </NavLink>
                    </span>
                    <form action="/search" className="search-box" onSubmit={handleSubmit}>
                        <button type="submit" className="icon"><BsSearch /></button>
                        <input type="search" name="q" placeholder="Search" defaultValue={query.get('q')} onChange={handleChange} aria-label="Search" />
                    </form>
                    <div className="header-secondary-links">
                        <div className="header-icon-list right">
                            <NavLink to='/cart' className={"navlink"}>
                                <BsCart3 size={27} />
                                <span className="cart-count">{cartCount}</span>
                            </NavLink>
                            <NavLink to='/wishlist' className="navlink"><AiOutlineHeart size={27} /></NavLink>
                            {
                                loggedInUser ? <>
                                    <button className="navlink" onClick={() => {
                                        let x = document.getElementById("acc-drop")
                                        if (x.style.display === "none")
                                            x.style.display = "block"
                                        else
                                            x.style.display = "none"
                                    }}>
                                        <div style={{ borderRadius: "50%", background: "red", color: "white", padding: "0.25rem 0.8rem", fontSize: "1.2rem" }}>
                                            {loggedInUser?.name.charAt(0)}
                                        </div>
                                        <div className="account-dropdwn" id="acc-drop" style={
                                            {
                                                position: "absolute",
                                                background: "white",
                                                display: "none",
                                                padding: "15px 0 10px 0",
                                                width: "175px",
                                                height: "fit-content",
                                                right: "1%",
                                                top: "55%",
                                                borderRadius: "5px",
                                                borderTop: "2px solid tomato",
                                                boxShadow: "0px 2px 2px 1px gray"
                                            }
                                        }>
                                            <div className="account-drop-item" style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                                <NavLink to="/customer/profile" style={{ margin: "0", paddingLeft: "1rem" }}>My account</NavLink>
                                            </div>
                                            <div className="divider" style={{ margin: "0 0 0.5rem 0" }}></div>
                                            <div className="account-drop-item" style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                                <NavLink to="/customer/orders" style={{ margin: "0", paddingLeft: "1rem" }}>Orders</NavLink>
                                            </div>
                                            <div className="divider" style={{ margin: "0 0 0.5rem 0" }}></div>
                                            <div className="account-drop-item" style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                                <button onClick={handleLogout} style={{ paddingLeft: "1rem" }}>Logout</button>
                                            </div>
                                        </div>
                                    </button>
                                </> : <>
                                    <button className="navlink" onClick={() => {
                                        let x = document.getElementById("acc-drop")
                                        if (x.style.display === "none")
                                            x.style.display = "block"
                                        else
                                            x.style.display = "none"
                                    }}>
                                        <AiOutlineUser size={27} />
                                        <div className="account-dropdwn" id="acc-drop" style={
                                            {
                                                position: "absolute",
                                                background: "white",
                                                display: "none",
                                                padding: "10px 5px",
                                                width: "200px",
                                                right: "0.5%",
                                                top: "50%",
                                                borderRadius: "5px",
                                                borderTop: "2px solid tomato",
                                                boxShadow: "0px 2px 2px 1px gray"
                                            }
                                        }>
                                            <div className="drop-items" style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                <NavLink className="navlink" to="/login" style={{
                                                    margin: "0.4rem 0 0.9rem 0"
                                                }}>
                                                    <button style={{
                                                        background: "#FF5E36",
                                                        color: "white",
                                                        borderRadius: "5px",
                                                        padding: "5px 8px"
                                                    }}>
                                                        Sign in
                                                    </button>
                                                </NavLink>
                                                <div className="divide" style={{
                                                    content: " ",
                                                    height: "1px",
                                                    width: "100%",
                                                    background: "#bcbcbc",
                                                    marginBottom: "0.8rem"
                                                }}></div>
                                                <h6 style={{ fontSize: "1.05rem" }}>New Customer ?</h6>
                                                <NavLink to="/register" style={{
                                                    fontFamily: "MetropolisSB",
                                                    fontSize: "1.05rem"
                                                }}>

                                                    Register

                                                </NavLink>
                                            </div>

                                        </div>
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="header-nav">
                    <nav className="navbar navbar-expand-lg navbar-light" style={{ width: "100% !important" }}>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul className="navbar-nav" style={{ fontFamily: "MetropolisSB", letterSpacing: "0.5px" }}>
                                <li className="nav-item">
                                    <NavLink className="navlink" to="/"><span className="link-title">HOME</span></NavLink>
                                </li>
                                <li className="nav-item" onMouseOver={() => {
                                    let x = document.getElementById("category-drop")
                                    if (x.style.display === "none")
                                        x.style.display = "block"
                                }} onMouseLeave={() => {
                                    let x = document.getElementById("category-drop")
                                    if (x.style.display === "block")
                                        x.style.display = "none"
                                }}>
                                    <button type="button" className="navlink dropdown" >
                                        <span className="link-title">CATEGORIES <IoIosArrowDown /></span>
                                        <div className="dropdown-megamenu" id="category-drop" style={{ display: "none" }}>
                                            <div className="row menu-wrapper">
                                                {
                                                    categories && categories.map((item, index) => (
                                                        item.parent_id ? <></> :
                                                            <div className="col-md-3 menu-item" key={index}>
                                                                <h5 className="menu-title">
                                                                    <NavLink className="navlink" to={'/productCategory/' + item.slug}>{item.name}</NavLink>
                                                                </h5>
                                                                <ul className="menu-list">
                                                                    {
                                                                        sub_categories && sub_categories.map((sub_item, index) => (
                                                                            sub_item.parent_id.name === item.name ?

                                                                                <li key={index}><NavLink className="navlink" to={'/productCategory/' + sub_item.slug}>{sub_item.name}</NavLink></li>

                                                                                : <></>
                                                                        ))
                                                                    }
                                                                </ul>

                                                            </div>
                                                    ))

                                                }

                                            </div>
                                        </div>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="navlink" to="/about"><span className="link-title"> DEALS </span></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="navlink" to="/about"><span className="link-title">ABOUT</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

            </div>
            <div className="mobile-header">
                <div className="mobile-header-inner">
                    <div className="mobile-header-top">
                        <div className="off-canvas-wrapper">  
                            <OffCanvas categories={categories} sub_categories={sub_categories}/>
                        </div>
                        <div className="mobile-header-logo">
                            <NavLink className="header-logo-link" to="/">
                                <img src={Logo} alt="TechShop" width={"150px"} />
                            </NavLink>
                        </div>
                        <div className="header-secondary-links">
                            <div className="header-icon-list right">
                                <NavLink to='/cart' className={"navlink"}>
                                    <BsCart3 size={23} />
                                    <span className="cart-count">{cartCount}</span>
                                </NavLink>
                                <NavLink to='/wishlist' className="navlink"><AiOutlineHeart size={23} /></NavLink>
                                {
                                    loggedInUser ? <>
                                        <button className="navlink" onClick={() => {
                                            let x = document.getElementById("acc-drop")
                                            if (x.style.display === "none")
                                                x.style.display = "block"
                                            else
                                                x.style.display = "none"
                                        }}>
                                            <div style={{ borderRadius: "50%", background: "red", color: "white", padding: "0.25rem 0.8rem", fontSize: "1.2rem" }}>
                                                {loggedInUser?.name.charAt(0)}
                                            </div>
                                            <div className="account-dropdwn" id="acc-drop" style={
                                                {
                                                    position: "absolute",
                                                    background: "white",
                                                    display: "none",
                                                    padding: "15px 0 10px 0",
                                                    width: "175px",
                                                    height: "fit-content",
                                                    right: "1%",
                                                    top: "55%",
                                                    borderRadius: "5px",
                                                    borderTop: "2px solid tomato",
                                                    boxShadow: "0px 2px 2px 1px gray"
                                                }
                                            }>
                                                <div className="account-drop-item" style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                                    <NavLink to="/customer/profile" style={{ margin: "0", paddingLeft: "1rem" }}>My account</NavLink>
                                                </div>
                                                <div className="divider" style={{ margin: "0 0 0.5rem 0" }}></div>
                                                <div className="account-drop-item" style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                                    <NavLink to="/customer/orders" style={{ margin: "0", paddingLeft: "1rem" }}>Orders</NavLink>
                                                </div>
                                                <div className="divider" style={{ margin: "0 0 0.5rem 0" }}></div>
                                                <div className="account-drop-item" style={{ textAlign: "left", fontSize: "1.2rem" }}>
                                                    <button onClick={handleLogout} style={{ paddingLeft: "1rem" }}>Logout</button>
                                                </div>
                                            </div>
                                        </button>
                                    </> : <>
                                        <button className="navlink" onClick={() => {
                                            let x = document.getElementById("acc-drop")
                                            if (x.style.display === "none")
                                                x.style.display = "block"
                                            else
                                                x.style.display = "none"
                                        }}>
                                            <AiOutlineUser size={23} />
                                            <div className="account-dropdwn" id="acc-drop" style={
                                                {
                                                    position: "absolute",
                                                    background: "white",
                                                    display: "none",
                                                    padding: "10px 5px",
                                                    width: "200px",
                                                    right: "0.5%",
                                                    top: "50%",
                                                    borderRadius: "5px",
                                                    borderTop: "2px solid tomato",
                                                    boxShadow: "0px 2px 2px 1px gray"
                                                }
                                            }>
                                                <div className="drop-items" style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <NavLink className="navlink" to="/login" style={{
                                                        margin: "0.4rem 0 0.9rem 0"
                                                    }}>
                                                        <button style={{
                                                            background: "#FF5E36",
                                                            color: "white",
                                                            borderRadius: "5px",
                                                            padding: "5px 8px"
                                                        }}>
                                                            Sign in
                                                        </button>
                                                    </NavLink>
                                                    <div className="divide" style={{
                                                        content: " ",
                                                        height: "1px",
                                                        width: "100%",
                                                        background: "#bcbcbc",
                                                        marginBottom: "0.8rem"
                                                    }}></div>
                                                    <h6 style={{ fontSize: "1.05rem" }}>New Customer ?</h6>
                                                    <NavLink to="/register" style={{
                                                        fontFamily: "MetropolisSB",
                                                        fontSize: "1.05rem"
                                                    }}>

                                                        Register

                                                    </NavLink>
                                                </div>

                                            </div>
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="site-search">
                        <form action="/search" className="search-box" onSubmit={handleSubmit}>
                            <button type="submit" className="icon"><BsSearch /></button>
                            <input type="search" name="q" placeholder="Search" defaultValue={query.get('q')} onChange={handleChange} aria-label="Search" />
                        </form>
                    </div>
                </div>
            </div>
        </header>

    </>
    )
}

export default NavBar
