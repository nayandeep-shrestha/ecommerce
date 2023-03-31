import Breadcrumb from "../breadcumb.component"
import { useSelector } from "react-redux"
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import BannerService from "./banner.service";
import { useNavigate } from "react-router-dom";

const BannerCreate = () => {
    // useEffect(() => {
    //     document.body.classList.add('active')
    //     return () => {
    //       document.body.classList.remove('active')
    //     }
    //   }, [])
    let navigate= useNavigate()
    let loggedInUser = useSelector((state) => {
        return state.user.userDetail
    })
    let banner_svc = new BannerService()
    const schema = Yup.object({
        title: Yup.string().required().nullable() ,
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
            try{
                let response = await banner_svc.createBanner(values)
                if(response.status){
                    toast.success(response.msg)
                    navigate("/admin/banner")
                }
            }catch(excep){
                console.log(excep)
                toast.error(excep.msg)
            }
        }
    })

    return (
        <>
            <div className="container-fluid">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h3 className="mb-2">Add New Banner</h3>
                    <Breadcrumb role={loggedInUser?.role} title="create" section="banner"/>
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
                                                    name="title" placeholder="Banner Title" onChange={formik.handleChange} required /></div>
                                                <span className="text-danger">
                                                    {formik.errors?.title}
                                                </span>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-3"><label className="ml-3 text-dark">Link : </label></div>
                                                <div className="col-9 align-self-end"><input type="text" className="form-control" name="link" onChange={formik.handleChange} /></div>
                                                <span className="text-danger">
                                                    {formik.errors?.link}
                                                </span>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-3"><label className="ml-3 text-dark">Status : </label></div>
                                                <div className="col-9 align-self-end">
                                                    <select className="form-control" name="status" onChange={formik.handleChange}>
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
                                                        required
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            let ext = (e.target.files[0].name.split(".")).pop()
                                                            console.log(ext)
                                                            if(["jpg", "jpeg", "svg", "png", "webp", "gif"].includes(ext.toLowerCase())){
                                                                formik.setValues({
                                                                    ...formik.values,
                                                                    image: e.target.files[0]
                                                                })
                                                            }else {
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
                                                            <img src={URL.createObjectURL(formik.values.image)} alt="" className="img-fluid img-thumbnail" /> : ""
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
export default BannerCreate