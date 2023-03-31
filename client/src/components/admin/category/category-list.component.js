import Breadcrumb from "../breadcumb.component"
import "./category.css"
import { NavLink } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import CategoryService from "./category.service"
import { toast } from "react-toastify"
import { Actions, LightBox, Status } from "../../common/common-components"
import DataTable from 'react-data-table-component';

const CategoryList = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user_data"))
    const [data, setData] = useState()
    let category_svc = new CategoryService()
    const getData = useCallback(async () => {
        try {
            let response = await category_svc.getAllList()
            if (response.result) {
                setData(response.result)
            }
        } catch (excep) {
            toast.error(excep)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        getData()
    }, [getData])

    const deleteAction = async (id) => {
        try {
            let response = await category_svc.deleteById(id)
            if (response.status) {
                toast.success("Category deleted successfully!!")
                getData()
            }
        } catch (excep) {
            toast.error(excep)
        }
    }
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Parent',
            selector: row => row.parent_id ? row.parent_id?.name : "",
        },
        {
            name: 'Image',
            selector: row => (
                row.image ?
                    <>
                        <LightBox image={process.env.REACT_APP_IMAGE_URL + "/category/" + row.image} name={row.image} />
                    </>
                    :
                    <>No  Image found</>
            ),
        },
        {
            name: 'Status',
            selector: row => <Status status={row.status} />,
        },
        {
            name: 'Action',
            selector: row => <Actions id={row._id} type="category" deleteAction={deleteAction} />,
        },
    ];



    return (<>
        <div className="container-fluid">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h3 className="mb-2">Category lists</h3>
                <Breadcrumb role={loggedInUser.role} title="Category" />
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-sm-4">
                                    <div className="search-box mr-2 mb-2 d-inline-block">
                                        <div className="position-relative">
                                            <input type="text" className="form-control pl-5" style={{ borderRadius: "20px" }} placeholder="Search..." />
                                            <i className="fa fa-search search-icon"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="text-sm-right">
                                        <NavLink to="/admin/category/create" className="btn btn-sm btn-success btn-rounded mb-2 mr-2">
                                            <i className="fa fa-plus mr-2"></i>Add New Category
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination

                                    selectableRows
                                    selectableRowsHighlight
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default CategoryList