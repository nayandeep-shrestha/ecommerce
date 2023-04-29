import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ submitAction, defaultValue, isEdit = false }) => {

    const schema = Yup.object({
        name: Yup.string().required().nullable(),
        email: Yup.string().required().email(),
        password: Yup.string().required().min(8),
        status: Yup.string().required().nullable(),
        role: Yup.string().required()
    })

    const formik = useFormik({
        initialValues: defaultValue,
        validationSchema: schema,
        onSubmit: async (values) => {
            submitAction(values)
        }
    })

    useEffect(() => {
        formik.setValues({
            ...defaultValue
        })
    }, [defaultValue])

    return (<>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Name : </label></div>
                <div className="col-9 align-self-end"><input type="text" className="form-control"
                    name="name" placeholder="Enter user name" onChange={formik.handleChange} value={formik.values?.name ?? ""} /></div>
                <span className="text-danger">
                    {formik.errors?.name}
                </span>
            </div>

            {
                !isEdit ? <>
                    <div className="form-group row">
                        <div className="col-3"><label className="ml-3 text-dark">Email : </label></div>
                        <div className="col-9 align-self-end"><input type="email" className="form-control"
                            name="email" placeholder="Enter user email" onChange={formik.handleChange} value={formik.values?.email ?? ""} /></div>
                        <span className="text-danger">
                            {formik.errors?.email}
                        </span>
                    </div>
                    <div className="form-group row">
                        <div className="col-3"><label className="ml-3 text-dark">Password : </label></div>
                        <div className="col-9 align-self-end"><input type="password" className="form-control"
                            name="password" placeholder="Enter password" onChange={formik.handleChange} /></div>
                        <span className="text-danger">
                            {formik.errors?.password}
                        </span>
                    </div>
                </>
                    : <></>
            }
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Role : </label></div>
                <div className="col-9 align-self-end">
                    <select className="form-control" name='role' onChange={formik.handleChange} value={formik.values?.role ?? ""} required>
                        <option>--Select Any One--</option>
                        <option value="seller">Seller</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
                <span className="text-danger">
                    {formik.errors?.role}
                </span>
            </div>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Status : </label></div>
                <div className="col-9 align-self-end">
                    <select className="form-control" name="status" onChange={formik.handleChange} value={formik.values?.status ?? ""}>
                        <option>--Select Any One--</option>
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
                        formik.values?.image
                            ?
                            (
                                (typeof (formik.values.image) === 'object')
                                    ?
                                    <img src={URL.createObjectURL(formik.values.image)} alt="" className="img-fluid img-thumbnail" />
                                    :
                                    <img src={process.env.REACT_APP_IMAGE_URL + '/user/' + formik.values.image} alt="" className="img-fluid img-thumbnail" />
                            )
                            :
                            <></>
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
    </>)
}

export default UserForm