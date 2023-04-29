import { useFormik } from "formik"
import { object, string, ref } from "yup"
import { useNavigate } from "react-router-dom"
import { useState, useCallback, useEffect } from "react"
import AuthService from "../../services/auth.service"
import UserService from "../admin/user/user.service";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Password from "../auth/password.component"

const ChangePassword = () => {
    let user_svc = new UserService()
    let navigate = useNavigate()
    let [disable, setDisable] = useState(false)
    let [ setProfileDetails] = useState()
    const getMyProfile = useCallback(async () => {
        try {
            let auth_svc = new AuthService()
            let result = await auth_svc.getMyProfile()
            if (result) {
                setProfileDetails(result.result)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    const schema = object({
        curr_password: string().required().matches(/[a-zA-Z0-9]/).min(8),
        new_password: string().required().matches(/[a-zA-Z0-9]/).min(8),
        confirm_password: string()
            .required("Please confirm your password")
            .oneOf([ref("new_password")], "Passwords do not match")
    })
    const formik = useFormik({
        initialValues: {
            curr_password: "",
            new_password: "",
            confirm_password: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                if (values.curr_password === values.new_password) {
                    toast.warning("New password cannot be same as current password")
                }
                else {
                    let updated_data = {
                        curr_password: values.curr_password,
                        new_password: values.new_password,
                        confirm_password: values.confirm_password,
                    }
                    let response = await user_svc.changePassword(updated_data)
                    if(response?.status){
                        navigate("/customer/profile")
                        toast.success(response.msg)
                    }else{
                        toast.warning(response.msg)
                    }
                }
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

    useEffect(() => {
        getMyProfile()
    }, [getMyProfile])
    return (
        <>
            <div className="col-sm-9">
                <header className="cart-header">
                    <h1>Change Password</h1>
                </header>
                <form className="user" onSubmit={formik.handleSubmit} style={{ fontFamily: "MetropolisR" }}>
                    <Password name="curr_password"
                        id="curr_password"
                        label="Current Password*"
                        placeholder="Please enter your current password"
                        error={formik?.errors?.curr_password}
                        handleChange={formik.handleChange} />
                    <Password handleChange={formik.handleChange}
                        id={"newPassword"}
                        error={formik?.errors?.new_password}
                        label={"New Password*"}
                        name={"new_password"}
                        placeholder="Minimum 8 characters with at least a number" />
                    <Password handleChange={formik.handleChange}
                        id={"confirmPassword"}
                        error={formik?.errors?.confirm_password}
                        label={"Confirm Password*"}
                        name={"confirm_password"}
                        placeholder="Please retype your password" />
                    <button type="submit" className="btn btn-block btn-main" disabled={disable}>
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChangePassword