import {useState} from "react"
import {useNavigate} from "react-router-dom"
// import {useDispatch} from "react-redux"
// import { otpEmail } from "../../../reducers/otp.slicer"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import AuthService from "../../../services/auth.service"

const ForgotPassword = () => {
    let navigate = useNavigate()
    let [disable, setDisable] = useState(false)
    const schema = Yup.object({
        email: Yup.string().email().required()
    })
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                setDisable(true)
                let auth_svc = new AuthService()
                let emailCheck = await auth_svc.checkUser(values)
                console.log(emailCheck)
                if(emailCheck){
                    navigate("/login/verify-otp/" + emailCheck.result.user_id)
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
        <>
        <ToastContainer />
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
                                            <h1 className="h3 text-gray-900 mb-4" style={{ fontFamily: "MetropolisSB" }}>Forgot your password?</h1>
                                            <p>Please enter your registered email so we can send you an otp to reset your password</p>
                                        </div>
                                        <form className="user" onSubmit={formik.handleSubmit} style={{ fontFamily: "MetropolisR" }}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    name="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." onChange={formik.handleChange}/>
                                            </div>
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
        </>
    )
}

export default ForgotPassword