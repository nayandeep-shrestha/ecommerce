import { useEffect } from "react"
import { Navigate,useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CustomerComponent = ({component}) => {
    let navigate = useNavigate()
    useEffect(()=>{
        let token = localStorage.getItem("user_token") ?? null
        if(token){
            let role = JSON.parse(localStorage.getItem("user_data")).role
            if(role !== 'customer'){
                toast.warning("You don't have privilege to access")
                navigate("/")
            }     
        }else{
            return <Navigate to="/login"/>
        }
    },[])
    return(
        component
    )
    
}

export default CustomerComponent