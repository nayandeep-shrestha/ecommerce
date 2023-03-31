import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const BrandForm = ({submitAction, defaultValue}) => {
    
    const schema = Yup.object({
        title: Yup.string().required().nullable(),
        status: Yup.string().required().nullable(),
    })

    const formik = useFormik({
        initialValues: defaultValue,
        validationSchema: schema,
        onSubmit: async (values) => {
            submitAction(values)
        }
    })
    
    useEffect(()=>{
        formik.setValues({
            ...defaultValue
        })
    },[defaultValue])


    return (<>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Title : </label></div>
                <div className="col-9 align-self-end"><input type="text" className="form-control"
                    name="title" placeholder="Brand Title" onChange={formik.handleChange} value={formik.values?.title ?? ""} required /></div>
                <span className="text-danger">
                    {formik.errors?.title}
                </span>
            </div>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Status : </label></div>
                <div className="col-9 align-self-end">
                    <select className="form-control" name="status" onChange={formik.handleChange} value={formik.values?.status ?? ""}>
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
                                (typeof(formik.values.image) === 'object') 
                                ?
                                    <img src={URL.createObjectURL(formik.values.image)} alt="" className="img-fluid img-thumbnail" /> 
                                :
                                    <img src={process.env.REACT_APP_IMAGE_URL+'/brand/'+formik.values.image} alt="" className="img-fluid img-thumbnail" />
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

export default BrandForm