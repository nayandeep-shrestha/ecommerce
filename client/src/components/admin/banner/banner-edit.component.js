import React, { useEffect } from "react";
import Breadcrumb from "../breadcumb.component"
import { useSelector } from "react-redux"
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import BannerService from "./banner.service";
import { useNavigate, useParams } from "react-router-dom";

const BannerEdit = () => {
    let navigate = useNavigate()
    let params = useParams()

    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })

    let banner_svc = new BannerService()
    const schema = Yup.object({
        title: Yup.string().required().nullable(),
        link: Yup.string().url().nullable(),
        status: Yup.string().required().nullable(),
    })
    const formik = useFormik({
        initialValues: {
            title: null,
            link: null,
            status: null,
            image: null
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                let updated_data = {
                    title: values.title,
                    link: values.link,
                    status: values.status
                }
                if(typeof(values.image) === 'object'){
                    updated_data.image = values.image
                }

                let response = await banner_svc.updateById(updated_data, params.id)
                if (response) {
                    toast.success("Banner Updated")
                    navigate("/admin/banner")
                }else{
                    throw response.msg
                }
            } catch (excep) {
                console.log(excep)
                toast.error(excep)
            }
        }
    })

    const getData = async () => {
        try {
            let response = await banner_svc.getById(params.id)
            if (response.result) {
                formik.setValues({
                    ...response.result
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

    return (
        <>
            <div className="container-fluid">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h3 className="mb-2">Edit Banner</h3>
                    <Breadcrumb role={loggedInUser?.role} title="edit" section="banner" />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col p-4">
                                        <h4 className="mb-4 ml-2 text-dark">Basic Information</h4>
                                        <hr className="mb-4" />
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="form-group row">
                                                <div className="col-3"><label className="ml-3 text-dark">Title : </label></div>
                                                <div className="col-9 align-self-end"><input type="text" className="form-control"
                                                    name="title" placeholder="Banner Title" value={formik.values?.title} onChange={formik.handleChange} required /></div>
                                                <span className="text-danger">
                                                    {formik.errors?.title}
                                                </span>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-3"><label className="ml-3 text-dark">Link : </label></div>
                                                <div className="col-9 align-self-end"><input type="text" className="form-control" name="link" value={formik.values?.link} onChange={formik.handleChange} /></div>
                                                <span className="text-danger">
                                                    {formik.errors?.link}
                                                </span>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-3"><label className="ml-3 text-dark">Status : </label></div>
                                                <div className="col-9 align-self-end">
                                                    <select className="form-control" name="status" value={formik.values?.status} onChange={formik.handleChange}>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>
                                                <span className="text-danger">
                                                    {formik.errors?.status}
                                                </span>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 ml-3 text-dark">Image : </label>
                                                <div className="col-sm-3">
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            let ext = (e.target.files[0].name.split(".")).pop()
                                                            console.log(ext)
                                                            if (["jpg", "jpeg", "svg", "png", "webp", "gif"].includes(ext.toLowerCase())) {
                                                                formik.setValues({
                                                                    ...formik.values,
                                                                    image: e.target.files[0]
                                                                })
                                                            } else {
                                                                formik.setErrors({
                                                                    ...formik.errors,
                                                                    image: "Invalid image format"
                                                                })
                                                            }
                                                        }}
                                                    />
                                                    <span className="text-danger">{formik.errors?.image}</span>
                                                </div>
                                                <div className="col-sm-3">
                                                    {
                                                        formik.values?.image ?
                                                            (
                                                                typeof (formik.values.image) === 'object' ?
                                                                    <img src={URL.createObjectURL(formik.values.image)} className="img-fluid img-thumbnail" alt="logo"/>
                                                                    : <img src={process.env.REACT_APP_IMAGE_URL + "/banner/" + formik.values.image} className="img-fluid img-thumbnail" alt="logo"/>
                                                            )
                                                            : <></>
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-group row mt-3">
                                                <div className="col-9 offset-sm-3">
                                                    <button type="reset" className="btn btn-danger mr-3 rounded-pill">
                                                        Reset
                                                    </button>
                                                    <button type="submit" className=" btn btn-success rounded-pill">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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

export default BannerEdit