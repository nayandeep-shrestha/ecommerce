import { useFormik } from "formik"
import { NavLink, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState} from "react"
import AuthService from "../../../services/auth.service"
import { useDispatch} from "react-redux";
import { userStore } from "../../../reducers/user.slicer";

const Login = () => {
    let [disable, setDisable] =useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const schema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required().matches(/[a-zA-Z0-9]/).min(8)
    })
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
           try{
            setDisable(true)
            let auth_svc = new AuthService()
            let loginResponse =await auth_svc.login(values)
            if(loginResponse){
                dispatch(userStore(loginResponse))
                toast.success("Welcome to user pannel")
                navigate("/" + loginResponse.role)
            }
           }catch(err){
            console.log("Respone: ",err)
            toast.error(err.msg)
        }finally{
            setDisable(false)
        }
        }
        // http://localhost:8000//api/v1/auth/login => request listener
        // http://localhost:3000/login => request generator
    })

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user_data")) ?? null;
        if(user){
            navigate("/"+user.role);
        }
    },[])
   
    return (
        <>
        <ToastContainer/>
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
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user" onSubmit={formik.handleSubmit}>
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                        name="email" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..." onChange={formik.handleChange} />
                                                    <span className="text-danger">
                                                        {formik?.errors?.email}
                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        name="password" placeholder="Password" onChange={formik.handleChange} />
                                                    <span className="text-danger">
                                                        {formik?.errors?.password}
                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block" disabled={disable}>
                                                    Login
                                                </button>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <NavLink className="small" to="forgot-password.html">Forgot Password?</NavLink>
                                            </div>
                                            <div className="text-center">
                                                <NavLink className="small" to="/register">Create an Account!</NavLink>
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
export default Login