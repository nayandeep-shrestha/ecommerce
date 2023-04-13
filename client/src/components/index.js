import NavBar from "./navbar/navbar.component";
import Footer from './footer/footer.component'
import AdminDashboard from './admin/dashboard.component'
import BannerList from "./admin/banner/banner-list.component";
import BannerCreate from "./admin/banner/banner-create.component";
import BannerEdit from "./admin/banner/banner-edit.component";
import {BrandList, BrandCreate, BrandEdit} from "./admin/brand/index"
import {CategoryList, CategoryCreate, CategoryEdit} from "./admin/category/index"
import {UserList, UserCreate, UserEdit} from "./admin/user/index"
import {ProductList, ProductCreate, ProductEdit} from "./admin/product/index"
import HomeComponent from "./home-page/index"
import Orders from "./customer/orders.component";

const Components ={
    NavBar,
    Footer,
    AdminDashboard,

    BannerList,
    BannerCreate,
    BannerEdit,

    BrandList,
    BrandCreate,
    BrandEdit,
    
    CategoryList,
    CategoryCreate,
    CategoryEdit,

    UserList,
    UserCreate,
    UserEdit,

    ProductCreate,
    ProductEdit,
    ProductList,

    HomeComponent,
    Orders
    
}

export default Components