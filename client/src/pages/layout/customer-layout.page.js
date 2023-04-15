import { Outlet} from "react-router-dom"
import "../../components/customer/customer.css"
import { CustomerSideBar } from "../../components/customer/customer-partials.component"
const CustomerLayout = () => {
    return (
        <section className='container-fluid'>
            <div className="cart-container customer">
                <div className="row">
                    <CustomerSideBar />
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default CustomerLayout