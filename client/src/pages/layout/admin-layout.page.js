import { Outlet } from "react-router-dom"
import "../../assets/css/admin.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap"
import { useCallback, useEffect } from "react"
import AuthService from "../../services/auth.service"
import { AdminFooter, AdminSidebar, AdminTopbar } from "../../components/admin/admin-partials.component"
import { useDispatch } from "react-redux"
import { userStore } from "../../reducers/user.slicer"

const AdminLayout = () => {
    let auth_svc = new AuthService()
    let dispatch = useDispatch()
    const checkValidation = useCallback(async () => {
        try {
            let loggedInUser = await auth_svc.getMyProfile()
            let storeData = {
                name: loggedInUser.result.name,
                email: loggedInUser.result.email,
                id: loggedInUser.result._id,
                role: loggedInUser.result.role
            }
            dispatch(userStore(storeData))
        } catch (excep) {
            console.log(excep)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        checkValidation()
    }, [checkValidation])

    return (
        <>
            <div id="wrapper" >
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
                        <main className="container-fluid">
                            <Outlet />
                        </main>
                    </div>
                    <AdminFooter />
                </div>
            </div>


            {/* Scroll to Top Button*/}
            {/* <a className="scroll-to-top rounded">
                <i className="fas fa-angle-up"></i>
            </a> */}
        </>
    )
}
export default AdminLayout