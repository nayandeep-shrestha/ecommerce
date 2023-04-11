import { useFormik } from "formik"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import AuthService from "../../../services/auth.service"
import * as Yup from "yup"
import Password from "../../../components/auth/password.component"

const Register = () => {
  let navigate = useNavigate()
  let [disable, setDisable] = useState(false)
  const schema = Yup.object({
    name: Yup.string().required("Name is compulsory").min(2, "name must be of at least two characters"),
    mobile: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().matches(/[a-zA-Z0-9]/).min(8),
    address: Yup.string().required(),
    role: Yup.string().nullable(),
    status: Yup.string().nullable()
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
      address: "",
      role: "customer",
      status: "active"
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      // console.log(values)
      try {
        setDisable(true)
        let auth_svc = new AuthService()
        let registerResponse = await auth_svc.register(values)
        if (registerResponse) {
          toast.success("Account has been created successfully.")
          navigate("/login")
        }
      } catch (err) {
        console.log("Respone: ", err)
        toast.error(err.msg)
      } finally {
        setDisable(false)
      }
    }
  })
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_data")) ?? null;
    if (user) {
      navigate("/");
    }
  }, [])
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
                    <div className="p-4">
                      <div className="text-center">
                        <h1 className="h3 text-gray-900 mb-4" style={{ fontFamily: "MetropolisR" }}>Create your Account</h1>
                      </div>
                      <form className="user mt-3" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <label className="ml-3">Name</label>
                          <input type="text" className="form-control form-control-user"
                            name="name" placeholder="Enter Your Name" onChange={formik.handleChange} />
                          <span className="text-danger">
                            {formik?.errors?.name}
                          </span>
                        </div>
                        <div className="form-group">
                          <label className="ml-3">Phone Number</label>
                          <input type="text" className="form-control form-control-user"
                            name="mobile" placeholder="Enter Your Phone number" onChange={formik.handleChange} />
                          <span className="text-danger">
                            {formik?.errors?.mobile}
                          </span>
                        </div>
                        <div className="form-group">
                          <label className="ml-3">Email</label>
                          <input type="email" className="form-control form-control-user"
                            name="email" placeholder="Enter Email Address..." onChange={formik.handleChange} />
                          <span className="text-danger">
                            {formik?.errors?.email}
                          </span>
                        </div>
                        <div className="form-group">
                          <label className="ml-3">Address</label>
                          <input type="text" className="form-control form-control-user"
                            name="address" placeholder="Enter your address...(Kupondole, Lalitpur-1)" onChange={formik.handleChange} />
                          <span className="text-danger">
                            {formik?.errors?.address}
                          </span>
                        </div>
                        <Password label={"Password"} name={"password"} id={"password"} error={formik?.errors?.password} handleChange={formik.handleChange} placeholder="Enter your password"/>
                        <li className="ml-2 mb-3 mt-0" style={{fontSize:"13px"}}>Password must be at least 8 characters long including at least one digit</li>
                        <div className="form-group">
                          <label className="ml-3">Role</label>
                          <select className="form-control" name="role" defaultValue={formik.values.role} onChange={formik.handleChange} >
                            <option value="seller">Seller</option>
                            <option value="customer">Customer</option>
                          </select>
                        </div>
                        <div className="form-group" style={{ visibility: "hidden", display: "none" }}>
                          <label className="ml-3">Status</label>
                          <select className="form-control" name="status" defaultValue={formik.values.status} onChange={formik.handleChange} >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <br />
                        <div className="mb-4" style={{ display: "flex" }}>
                          <button type="reset" className="btn" style={{ flex: "50%" }}>
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-main" disabled={disable} style={{ flex: "50%" }}>
                            Register
                          </button>
                        </div>
                        <span className="ml-2 mb-3">Already member? <NavLink to="/login">Login</NavLink> here</span>
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

export default Register

