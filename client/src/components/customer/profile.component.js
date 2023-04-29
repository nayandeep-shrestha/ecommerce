import React, { useState} from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { NavLink, useOutletContext } from "react-router-dom"
import UserService from "../admin/user/user.service";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    let user_svc = new UserService()
    let profileDetails = useOutletContext()
    let [disable, setDisable] = useState(false)
    let [inputDisable, setInputDisable] = useState(true)
    const schema = Yup.object({
        name: Yup.string().required().min(2, "Name must be at least 2 letters long"),
        email: Yup.string().email().required(),
        mobile: Yup.string().required().length(10, "mobile number must be ten digits"),
        address: Yup.string().required().matches(/^[#.0-9a-zA-Z\s,-]+$/)
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            address: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                let updated_data = {
                    name: values.name,
                    email: values.email,
                    mobile: values.mobile,
                    address: values.address
                }
                let response = await user_svc.updateUserProfile(updated_data, profileDetails._id)
                if (response) {
                    toast.success("User Updated")
                } else {
                    throw response.msg
                }
                setDisable(true)
                setInputDisable(true)
                // console.log(updated_data)
                document.getElementById("save-changes").style.display = "none"
                document.getElementById("edit-btn").style.display = "block"

            } catch (err) {
                console.log("Respone: ", err)
                toast.error(err.msg)
            } finally {
                setDisable(false)
            }
        }
        // http://localhost:8000//api/v1/auth/login => request listener
        // http://localhost:3000/login => request generator
    })
    const handleEdit = (e) => {
        e.preventDefault()
        setInputDisable(false)
        document.getElementById("save-changes").style.display = "block"
        document.getElementById("edit-btn").style.display = "none"
    }
    return (
        <>
            <div className="col-sm-9">
                <header className="cart-header">
                    <h1>Profile</h1>
                </header>
                <form className="user" onSubmit={formik.handleSubmit} style={{ fontFamily: "MetropolisR" }}>
                    <div className="form-group">
                        <label className="ml-3">Full Name</label>
                        <input type="text" className="form-control form-control-user"
                            name="name" defaultValue={profileDetails?.name} onChange={formik.handleChange} disabled={inputDisable} />
                        <span className="text-danger">
                            {formik?.errors?.name}
                        </span>
                    </div>
                    <div className="d-flex" style={{ gap: "2rem" }}>
                        <div className="form-group" style={{ flex: "50%" }}>
                            <label className="ml-3">Email address</label>
                            <input type="email" className="form-control form-control-user"
                                name="email" defaultValue={profileDetails?.email} onChange={formik.handleChange} disabled={inputDisable} />
                            <span className="text-danger">
                                {formik?.errors?.email}
                            </span>
                        </div>
                        <div className="form-group" style={{ flex: "50%" }}>
                            <label className="ml-3">Mobile number</label>
                            <input type="text" className="form-control form-control-user"
                                name="mobile" defaultValue={profileDetails?.mobile} onChange={formik.handleChange} disabled={inputDisable} />
                            <span className="text-danger">
                                {formik?.errors?.mobile}
                            </span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="ml-3">Address ( Format: Bafal, Kathmandu-14 )</label>
                        <input type="text" className="form-control form-control-user"
                            name="address" defaultValue={profileDetails?.address} onChange={formik.handleChange} disabled={inputDisable} />
                        <span className="text-danger">
                            {formik?.errors?.address}
                        </span>
                    </div>
                    <div id="edit-btn" style={{ display: "block" }}>
                        <div className="d-flex">
                            <button type="button" onClick={handleEdit} className="btn btn-block btn-main" disabled={disable}>
                                Edit Profile
                            </button>
                                <NavLink to="/customer/change-password" className="btn btn-block" style={{marginTop: "0"}}>
                                    Change Password
                                </NavLink>
                        </div>
                    </div>
                    <button type="submit" id="save-changes" style={{ display: "none" }} className="btn btn-block btn-main" disabled={disable}>
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default Profile