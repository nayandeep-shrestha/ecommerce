import { useCallback, useEffect, useState } from "react"
import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import { category_svc } from "../admin/category/category.service"
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector } from "react-redux"
import {AiOutlineHeart, AiOutlineUser} from "react-icons/ai"
import { BsSearch, BsCart3 } from "react-icons/bs"
import { IoIosArrowDown } from "react-icons/io"
import "./navbar.css"
import Logo from "../../assets/images/logo/logo.png"

const NavBar = () => {
    const [isShow, setShow] = useState(false);
    let [keyword, setKeyword] = useState();
    const [query, setQuery] = useSearchParams();
    let navigate = useNavigate();
    const loggedInUser = useSelector((state) => {
        return state.user.userDetail;
    })
    const cartCount = useSelector((state) => {
        let cart = state.cart.cartDetail
        let quantity = 0
        if(cart && cart.length){
            cart.forEach((item)=> {
                quantity += Number(item.quantity)
            })
        }
        return quantity
    })
    const show = (e) => {
        setShow(true);
    }
    const hide = (e) => {
        setShow(false);
    }
    const handleChange = (e) => {
        setKeyword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(keyword);
        if(keyword === undefined){
            navigate(`/search?q=`);
        }else{
            navigate(`/search?q=${keyword}`);
        }
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
                
            }
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        getAllCategories();
    }, [getAllCategories])

    return (<>
        <header className="header-wrapper">
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
                        <NavLink to='/wishlist' className="navlink"><AiOutlineHeart size={27}/></NavLink>
                        {
                            loggedInUser ? <>
                                <NavLink className="navlink" to="/admin"><div style={{borderRadius: "50%", background: "red", color:"white", padding:"0.25rem 0.8rem", fontSize: "1.2rem"}}>{loggedInUser?.name.charAt(0)}</div></NavLink>
                            </> : <>
                                <NavLink className="navlink" to="/login"><AiOutlineUser size={27} /></NavLink>
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
                            <li className="nav-item">
                                <button type="button" className="navlink dropdown">
                                    <span className="link-title" onMouseOver={show}>CATEGORIES <IoIosArrowDown /></span>
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
                <div className={isShow ? "dropdown-megamenu dropdown-menu show" : "dropdown-megamenu dropdown-menu"} onMouseLeave={hide} style={{
                    position: "absolute",
                    inset: "0px auto auto 0px",
                    margin: "0px",
                    transform: "translate3d(10px, 5px, 0px)",
                }}>
                    <div className="row menu-wrapper">
                        {
                            categories && categories.map((item, index) => (    
                                item.parent_id ? <></> :                        
                                <div className="col-md-3" key={index}>
                                    <h5 className="menu-title">
                                        {item.name}
                                    </h5>
                                    <ul className="menu-list">
                                    {
                                        sub_categories && sub_categories.map((sub_item, index) =>(
                                            sub_item.parent_id.name === item.name ? 
                                            
                                        <li key={index}><NavLink className="navlink" to="#">{sub_item.name}</NavLink></li>
                                    
                                    :<></>
                                        ))
                                    }
                                    </ul>
                                    
                                </div>
                            ))

                        }

                    </div>
                </div>
            </div>
        </header>

    </>
    )
}

export default NavBar
