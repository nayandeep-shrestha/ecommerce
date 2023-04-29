import React, { useEffect, useState } from "react";
import Breadcrumb from "../breadcumb.component"
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import ProductService from "./product.service";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "./product-form.component";

const ProductEdit = () => {

    let product_svc = new ProductService()
    let navigate = useNavigate()
    let params = useParams()
    let [data, setData] = useState()

    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    const getData = async () => {
        try {
            let response = await product_svc.getById(params.id)
            if (response.result) {
                let sel_brand = {
                    value: response.result.brand._id,
                    label: response.result.brand.title
                }
                let sel_seller = {
                    value: response.result?.seller?._id,
                    label: response.result?.seller?.name
                }
                let sel_categories = []
                response.result.categories.map((item) => {
                    sel_categories.push({
                        value: item._id,
                        label: item.name
                    })
                })
                setData({
                    ...response.result,
                    categories: sel_categories,
                    seller: sel_seller,
                    brand: sel_brand
                })
            }
        } catch (excep) {
            console.log("error ", excep)
        }
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    const submitForm = async (values) => {
        try {
            let images= values.images
            let form_data = new FormData()
            if(images.length) {
                images.map((item) => {
                    if(typeof item === "object"){
                        form_data.append("images", item, item.name)
                    }
                })
                delete values.images
            }
            delete values._id;
            delete values.createdAt;
            delete values.created_by;
            delete values.updatedAt;
            delete values.actual_price;
            delete values.__v;
            Object.keys(values).map((item) => {
                form_data.append(item, values[item])
            })

            let response = await product_svc.updateById(form_data, params.id)
            if (response) {
                toast.success("Product Updated")
                navigate("/admin/product")
            } else {
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
                    <h3 className="mb-2">Edit Product</h3>
                    <Breadcrumb role={loggedInUser?.role} title="edit" section="product" />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <ProductForm 
                                            submitAction={submitForm}
                                            defaultValue={data} />
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

export default ProductEdit