import { NavLink } from "react-router-dom"
import commonFunc from "../../config/function"
const Breadcrumb = (props) => {

    return (<>
        <div className="page-title-right">
            <ol className="breadcrumb  mb-4">
                <li className="breadcrumb-item"><NavLink to={"/" + props.role}>Dashboard </NavLink></li>
                {props.section ?
                    <li className="breadcrumb-item">
                        <NavLink to={`/${props.role}/${props.section}`}>{commonFunc.capFirst(props.section)}</NavLink>
                    </li> : ""}
                {props.title ?
                    <li className=" breadcrumb-item active" aria-current="page"> {commonFunc.capFirst(props.title)}</li> : ""}
            </ol>
        </div>
    </>)
}

export default Breadcrumb