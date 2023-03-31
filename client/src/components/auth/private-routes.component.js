import { Navigate } from "react-router-dom"

const PrivateComponent = ({component}) => {
    let token = localStorage.getItem("user_token") ?? null
    if(token){
        return component
    }else{
        return <Navigate to="/login"/>
    }
}

export default PrivateComponent