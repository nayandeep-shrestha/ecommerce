import Breadcrumb from "../breadcumb.component"
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import UserService from "./user.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserForm from "./user-form.component";
import { MdContactSupport } from "react-icons/md";

const UserEdit = () => {

    let user_svc = new UserService()
    let navigate = useNavigate()
    let params = useParams()
    let [data, setData] = useState()

    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    const getData = async () => {
        try {
            let response = await user_svc.getById(params.id)
            if (response.result) {
                setData(response.result)
            }
        } catch (excep) {
            console.log("error ", excep)
        }
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    const submitForm = async(values) => {
        try {
            let updated_data = {
                name: values.name,
                status: values.status,
                role: values.role
            }
            if(typeof(values.image) === 'object'){
                updated_data.image = values.image
            }

            let response = await user_svc.updateById(updated_data, params.id)
            if (response) {
                toast.success("User Updated")
                navigate("/admin/user")
            }else{
                throw response.msg
            }
        } catch (excep) {
            console.log(excep)
            toast.error(excep)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h3 className="mb-2">Edit User</h3>
                    <Breadcrumb role={loggedInUser?.role} title="edit" section="user" />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <UserForm submitAction={submitForm}
                                                defaultValue={data}
                                                isEdit={true}/>
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

export default UserEdit