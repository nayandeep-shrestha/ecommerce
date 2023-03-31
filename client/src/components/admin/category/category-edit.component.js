import Breadcrumb from "../breadcumb.component"
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import CategoryService from "./category.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryForm from "./category-form.component";
import { MdContactSupport } from "react-icons/md";

const CategoryEdit = () => {

    let category_svc = new CategoryService()
    let navigate = useNavigate()
    let params = useParams()
    let [data, setData] = useState()

    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    const getData = async () => {
        try {
            let response = await category_svc.getById(params.id)
            if (response.result) {
                let category_detail =response.result
                category_detail.parent_id = category_detail.parent_id?._id
                setData(category_detail)
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
                parent_id: values.parent_id
            }
            if(typeof(values.image) === 'object'){
                updated_data.image = values.image
            }

            let response = await category_svc.updateById(updated_data, params.id)
            if (response) {
                toast.success("Category Updated")
                navigate("/admin/category")
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
                    <h3 className="mb-2">Edit Category</h3>
                    <Breadcrumb role={loggedInUser?.role} title="edit" section="category" />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <CategoryForm submitAction={submitForm}
                                                defaultValue={data}/>
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

export default CategoryEdit