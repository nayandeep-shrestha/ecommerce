import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userStore } from "../../reducers/user.slicer"

const Logout = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem("user_data")
        localStorage.removeItem("user_token")
        dispatch(userStore({}));
        navigate("/login")
    }, [dispatch, navigate])
}

export default Logout