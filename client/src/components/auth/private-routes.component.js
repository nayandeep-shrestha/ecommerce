import { useEffect } from "react"
import { Navigate,useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const PrivateComponent = ({component}) => {
    let navigate = useNavigate()
    useEffect(()=>{
        let token = localStorage.getItem("user_token") ?? null
        if(token){
            let role = JSON.parse(localStorage.getItem("user_data")).role
            if(role === 'admin'){
                return component
            }else{
                navigate("/")
            }     
        }else{
            return <Navigate to="/login"/>
        }
    },[])
    
}

export default PrivateComponent