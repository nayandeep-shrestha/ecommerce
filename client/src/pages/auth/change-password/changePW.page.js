import { useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import { object, string, ref } from "yup"
import AuthService from "../../../services/auth.service"
import { toast } from "react-toastify"
import Password from "../../../components/auth/password.component"

const ChangePW = () => {
    let [disable, setDisable] = useState(false)
    let navigate = useNavigate()
    let params = useParams()
    const schema = object({
        password: string().required().matches(/[a-zA-Z0-9]/).min(8),
        confirmPassword: string()
            .required("Please confirm your password")
            .oneOf([ref("password")], "Passwords do not match")
    })
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                setDisable(true)
                let updatedDetails = {
                    id: params.id,
                    password: values.password,
                    confirmPassword: values.confirmPassword
                }
                let auth_svc = new AuthService()
                let response = await auth_svc.changePw(updatedDetails)
                if(response.status){
                    toast.success(response.message)
                    navigate("/login")
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

    return (
        <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-lg-6 col-sm-12 col-xs-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row justify-content-center">
                                <div className="col">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h3 text-gray-900 mb-4" style={{ fontFamily: "MetropolisSB" }}>Reset Your Password</h1>
                                            <p>Please enter your new password below</p>
                                        </div>
                                        <form className="user" onSubmit={formik.handleSubmit} style={{ fontFamily: "MetropolisR" }}>
                                            <Password handleChange={formik.handleChange}
                                                id={"newPassword"}
                                                error={formik?.errors?.password}
                                                label={"New Password*"}
                                                name={"password"} 
                                                placeholder="Minimum 8 characters with at least a number" />
                                            <Password handleChange={formik.handleChange}
                                                id={"confirmPassword"}
                                                error={formik?.errors?.confirmPassword}
                                                label={"Confirm Password*"}
                                                name={"confirmPassword"} 
                                                placeholder="Please retype your password" />
                                            <button type="submit" className="btn btn-block btn-main" disabled={disable}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePW