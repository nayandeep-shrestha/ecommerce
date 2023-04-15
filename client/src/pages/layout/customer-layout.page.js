import { Outlet} from "react-router-dom"
import { useState, useCallback, useEffect } from "react"
import AuthService from "../../services/auth.service"
import "../../components/customer/customer.css"
import { CustomerSideBar } from "../../components/customer/customer-partials.component"

const CustomerLayout = () => {
    let [profileDetails, setProfileDetails] = useState()
    const getMyProfile = useCallback(async () => {
        try {
            let auth_svc = new AuthService()
            let result = await auth_svc.getMyProfile()
            if (result) {
                setProfileDetails(result.result)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(() => {
        getMyProfile()
    }, [getMyProfile])
    return (
        <section className='container-fluid'>
            <div className="cart-container customer">
                <div className="row">
                    <CustomerSideBar />
                    <Outlet context={profileDetails}/>
                </div>
            </div>
        </section>
    )
}

export default CustomerLayout