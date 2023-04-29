/* eslint-disable array-callback-return */
import React from "react"
import Breadcrumb from "../breadcumb.component"
import ProductForm from "./product-form.component";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { product_svc } from "../product/product.service";

const ProductCreate = () => {
    let defaultData={
        title:null,
        description:null,
        price:null,
        dsicount:null,
        categories:null,
        brand:null,
        images:null,
        stock:null,
        sku:null,
        seller:null
    }
    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    let navigate= useNavigate()
    const submit = async(data) => {
        try{
            let form_data = new FormData()
            if(data.images){
                // eslint-disable-next-line array-callback-return
                data.images.map((image) => {
                    form_data.append("images", image, image.name)
                })
                delete data.images
            }
            Object.keys(data).map((item) => {
                form_data.append(item, data[item])
            })
            let response = await product_svc.createProduct(form_data)
            if(response){
                toast.success("Product created")
                navigate("/admin/product")
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
                    <h3 className="mb-2">Add New Product</h3>
                    <Breadcrumb role={loggedInUser?.role} title="create" section="product"/>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <ProductForm submitAction={submit} 
                                                   defaultValues={defaultData}/>
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
export default ProductCreate