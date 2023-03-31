import Breadcrumb from "../breadcumb.component"
import UserService from "./user.service";
import UserForm from "./user-form.component";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserCreate = () => {

    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    let navigate= useNavigate()
    let user_svc = new UserService()

    const submit = async(data) => {
        try{
            let response = await user_svc.createUser(data)
            if(response){
                toast.success("User created")
                navigate("/admin/user")
            }
        }catch(excep){
            console.log(excep)
            toast.error(excep.msg)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h3 className="mb-2">Add New User</h3>
                    <Breadcrumb role={loggedInUser?.role} title="create" section="user"/>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <UserForm submitAction={submit} 
                                                   defaultValues={{
                                                    name: null,
                                                    status: null,
                                                    parent_id: null,
                                                    image: null
                                                }}
                                                isEdit={false}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserCreate