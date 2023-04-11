import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import AuthService from "../../../services/auth.service"
import { toast } from "react-toastify"

const VerifyOTP = () => {
    let [disable, setDisable] = useState(false)
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    let navigate = useNavigate()
    let params = useParams()
    const schema = Yup.object({
        otp: Yup.string().required().length(4, "Must be four characters")
    })
    const formik = useFormik({
        initialValues: {
            otp: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                setDisable(true)
                let otpData = {
                    id: params.id,
                    otp: values.otp
                }
                let auth_svc = new AuthService()
                let verification = await auth_svc.otpVerify(otpData)
                if(verification.status){
                    navigate("/login/change-password/"+ verification.result)
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
    const resend = async () => {
        try {
            setMinutes(1);
            setSeconds(30);
            let auth_svc = new AuthService()
            let id = {
                id: params.id
            }
            await auth_svc.resendOTP(id)
        } catch (err) {
            console.log("Respone: ", err)
            toast.error(err.msg)
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);
    return (
        <>
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
                                                <h1 className="h3 text-gray-900 mb-4" style={{ fontFamily: "MetropolisSB" }}>Email Verification</h1>
                                                <p>Check your email. We have send a otp </p>
                                            </div>
                                            <form className="user" onSubmit={formik.handleSubmit} style={{ fontFamily: "MetropolisR" }}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-user"
                                                        name="otp" placeholder="Enter OTP" onChange={formik.handleChange} />
                                                    <span className="text-danger">
                                                        {formik?.errors?.otp}
                                                    </span>
                                                </div>

                                                <button type="submit" className="btn btn-block btn-main" disabled={disable}>
                                                    Verify Code
                                                </button>
                                            </form>
                                            <div className="countdown-text">
                                                {seconds > 0 || minutes > 0 ? (
                                                    <p>
                                                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                                        {seconds < 10 ? `0${seconds}` : seconds}
                                                    </p>
                                                ) : (
                                                    <p>Didn't recieve code?</p>
                                                )}

                                                <button
                                                    disabled={seconds > 0 || minutes > 0}
                                                    style={{
                                                        color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                                                    }}
                                                    onClick={resend}
                                                >
                                                    Resend OTP
                                                </button>
                                            </div>
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

export default VerifyOTP