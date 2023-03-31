import Breadcrumb from "../breadcumb.component"
import CategoryService from "./category.service";
import CategoryForm from "./category-form.component";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CategoryCreate = () => {

    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    let navigate= useNavigate()
    let category_svc = new CategoryService()

    const submit = async(data) => {
        try{
            let response = await category_svc.createCategory(data)
            if(response){
                toast.success("Category created")
                navigate("/admin/category")
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
                    <h3 className="mb-2">Add New Category</h3>
                    <Breadcrumb role={loggedInUser?.role} title="create" section="category"/>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <CategoryForm submitAction={submit} 
                                                   defaultValues={{
                                                    name: null,
                                                    status: null,
                                                    parent_id: null,
                                                    image: null
                                                }}/>
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
export default CategoryCreate