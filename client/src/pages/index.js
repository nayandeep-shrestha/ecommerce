import Login from "./auth/login/login.page"
import Register from "./auth/register/register.page"
import HomePage from "./home/home.page"
import AdminLayout from "./layout/admin-layout.page"
import HomeLayout from "./layout/home-layout.page"
import Error from "./error/404.page"
import SearchPage from "./search/search.page"
import CategoryProducts from "./category-product/categoryProduct.page"
import BrandProducts from "./brand-product/brandProduct.page"
import ProductDetail from "./product-detail/productDetail"
import Cart from "./cart/cart.page"
import Checkout from "./checkout/checkout.page"
import ForgotPassword from "./auth/forget-password/forget-password.page"
import VerifyOTP from "./auth/verifyOTP/verifyOTP.page"
import LoginLayout from "./layout/login.layout"
import ChangePW from "./auth/change-password/changePW.page"
import CustomerLayout from "./layout/customer-layout.page"

const Pages ={
  HomePage,
  LoginLayout,
  Login,
  Register,
  ForgotPassword,
  VerifyOTP,
  ChangePW,

  AdminLayout,
  HomeLayout,
  Error,
  SearchPage,
  CategoryProducts,
  BrandProducts,
  ProductDetail,
  Cart,
  Checkout,

  CustomerLayout
}

export default Pages