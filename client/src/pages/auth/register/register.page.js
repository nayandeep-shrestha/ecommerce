import { useFormik } from "formik"
import * as Yup from "yup"

const Register = () => {

  const schema = Yup.object({
    name: Yup.string().required("Name is compulsory").min(2, "name must be of at least two characters"),
    email: Yup.string().email().required(),
    password: Yup.string().required().matches(/[a-zA-Z0-9]/).min(8),
    role: Yup.string().nullable()
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "customer"
    },
    validationSchema: schema,
    onSubmit: (values) => {
      
    }
  })
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
                          <label className="ml-3">Email</label>
                          <input type="email" className="form-control form-control-user"
                            name="email" placeholder="Enter Email Address..." onChange={formik.handleChange} />
                          <span className="text-danger">
                            {formik?.errors?.email}
                          </span>
                        </div>
                        <div className="form-group">
                          <label className="ml-3">Password</label>
                          <input type="password" className="form-control form-control-user"
                            name="password" placeholder="At least 8 characters" onChange={formik.handleChange} />
                          <span className="text-danger">
                            {formik?.errors?.password}
                          </span>
                        </div>
                        <div className="form-group">
                          <label className="ml-3">Role</label>
                          <select className="form-control" name="role" defaultValue={formik.values.role} onChange={formik.handleChange} >
                            <option value="seller">Seller</option>
                            <option value="customer">Customer</option>
                          </select>

                        </div>
                        <br />
                        <div className="row  justify-content-center form-group mb-3">
                          <div className="col-6">
                            <button type="reset" className="btn btn-danger btn-user btn-block">
                              Cancel
                            </button>
                            <button type="submit" className=" btn btn-success btn-user btn-block">
                              Register
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
      </div>
    </>
  )
}

export default Register

