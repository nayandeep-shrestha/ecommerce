import FsLightbox from "fslightbox-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md"
import Swal from "sweetalert2"
import commonFunc from "../../config/function";

export const LightBox = ({ image, name }) => {
    const [toggler, setToggler] = useState(false);
    return (
        <>
            <NavLink onClick={() => setToggler(!toggler)}>
                {name}
            </NavLink>
            <FsLightbox
                toggler={toggler}
                sources={[image]}
            />
        </>
    );
}

export const Status = (props) => {
    return (
        <span className={`badge p-1 ${props.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
            {commonFunc.capFirst(props.status)}
        </span>
    )
}

export const Actions = ({ type, id, deleteAction}) => {
    const confirm = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAction(id)
                // Swal.fire(
                //     'Deleted!',
                //     'Banner has been deleted.',
                //     'success'
                // )
            }
        })
    }
    return (<>
        <div className="d-flex">
            <NavLink to={"/admin/" + type + "/" +id}>
                <MdEdit className="text-success mr-2" style={{ fontSize: "20px" }} />
            </NavLink>
            <NavLink onClick={confirm} to={"/admin/"+type}>
                <MdDelete className="text-danger" style={{ fontSize: "20px" }} />
            </NavLink>
        </div>
    </>)
}

export const Checkbox =({label, checked, name, handleChange}) => {
    const defaultChecked = checked ? checked : false;
    let [isChecked, setIsChecked] = useState(defaultChecked)
    return(
        <label className="checkbox">
            <input type="checkbox" name={name} id="" checked={isChecked} 
            className={isChecked ? "checked" : ""}
            onChange={() => {setIsChecked((prev) => !prev);  if(isChecked === false){handleChange([name])} else {handleChange("")}} } />
            <span>{label}</span>
        </label>
    )
}