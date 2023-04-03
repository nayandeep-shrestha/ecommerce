import Components from "../../components"
import { Outlet } from "react-router-dom"
import AuthService from "../../services/auth.service"
import { useDispatch } from "react-redux"
import { useCallback, useEffect } from "react"
import { userStore } from "../../reducers/user.slicer"
import { updateCart } from "../../reducers/cart.slicer"
 
const HomeLayout = () => {
    let auth_svc = new AuthService()
    let dispatch = useDispatch()
    const checkValidation = useCallback(async() => {
        try{
           let loggedInUser = await auth_svc.getMyProfile()
           let storeData = {
            name: loggedInUser.result.name,
            email:  loggedInUser.result.email,
            id: loggedInUser.result._id,
            role:   loggedInUser.result.role
           }
           dispatch(userStore(storeData))
        } catch(excep){
            console.log(excep)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() =>{
        let token= localStorage.getItem("user_token") ?? null
        if(token){
            checkValidation()
        }
        dispatch(updateCart())
    },[checkValidation])

    return (
        <>
            <Components.NavBar />
            <Outlet />
            <Components.Footer />
        </>
    )
}

export default HomeLayout