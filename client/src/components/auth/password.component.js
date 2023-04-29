import React from "react"
import { RiEyeCloseLine } from "react-icons/ri"
import { IoEye } from "react-icons/io5"

const Password = (props) => {
    let passwordView = (e) => {
        e.preventDefault()
        var type = document.getElementById(props.id)
        if (type.type === "password") {
            type.type = "text"
            document.getElementById(props.id + "-show-pass").style.display = "none"
            document.getElementById(props.id + "-hide-pass").style.display = "block"
        } else {
            type.type = "password"
            document.getElementById(props.id + "-show-pass").style.display = "block"
            document.getElementById(props.id + "-hide-pass").style.display = "none"
        }
    }
    return (
        <div className="form-group">
            {props.label && <label className="ml-3">{props.label}</label>}
            
            {/* <div className="pass-wrap form-control form-control-user" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}> */}
            <div className="pass-wrap form-control form-control-user" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <input type="password"
                    name={props.name}
                    id={props.id}
                    style={{ border: "none", background: "transparent", outline: "none",flex:"80%" }}
                    placeholder={props.placeholder}
                    onChange={props.handleChange} />
                <button onClick={passwordView} style={{ cursor: "pointer" }}>
                    <RiEyeCloseLine id={props.id + "-show-pass"}
                        style={{ display: "block" }}
                        size={30}
                        color="gray" />
                    <IoEye id={props.id + "-hide-pass"}
                        style={{ display: "none" }}
                        size={30}
                        color="gray" />
                </button>
            </div>
            <span className="text-danger">
                {props.error}
            </span>
        </div>
    )
}

export default Password