import React, { useEffect, useState } from "react";
import Breadcrumb from "../breadcumb.component"
import { useSelector } from "react-redux"
import { toast } from "react-toastify";
import BrandService from "./brand.service";
import { useNavigate, useParams } from "react-router-dom";
import BrandForm from "./brand-form.component";

const BrandEdit = () => {

    let brand_svc = new BrandService()
    let navigate = useNavigate()
    let params = useParams()
    let [data, setData] = useState()

    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    const getData = async () => {
        try {
            let response = await brand_svc.getById(params.id)
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
                title: values.title,
                status: values.status
            }
            if(typeof(values.image) === 'object'){
                updated_data.image = values.image
            }

            let response = await brand_svc.updateById(updated_data, params.id)
            if (response) {
                toast.success("Brand Updated")
                navigate("/admin/brand")
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
                    <h3 className="mb-2">Edit Brand</h3>
                    <Breadcrumb role={loggedInUser?.role} title="edit" section="brand" />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <BrandForm submitAction={submitForm}
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

export default BrandEdit