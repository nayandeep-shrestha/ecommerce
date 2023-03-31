import Breadcrumb from "../breadcumb.component"
import BrandService from "./brand.service";
import BrandForm from "./brand-form.component";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BrandCreate = () => {

    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    let navigate= useNavigate()
    let brand_svc = new BrandService()

    const submit = async(data) => {
        try{
            let response = await brand_svc.createBrand(data)
            if(response.status){
                toast.success("Brand created")
                navigate("/admin/brand")
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
                    <h3 className="mb-2">Add New Brand</h3>
                    <Breadcrumb role={loggedInUser?.role} title="create" section="brand"/>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <BrandForm submitAction={submit} 
                                                   defaultValues={{
                                                    title: null,
                                                    status: null,
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
export default BrandCreate