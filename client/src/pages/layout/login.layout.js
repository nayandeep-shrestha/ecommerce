import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const LoginLayout = () => {
    let navigate = useNavigate()
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user_data")) ?? null;
        if (user) {
            navigate("/");
        }
    }, [])
  return (
    <>
        <ToastContainer />
        <Outlet/>
    </>
  )
}

export default LoginLayout