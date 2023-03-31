import Breadcrumb from "../breadcumb.component"
import "./product.css"
import { NavLink } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import ProductService from "./product.service"
import { toast } from "react-toastify"
import { Actions, LightBox, Status } from "../../common/common-components"
import DataTable from 'react-data-table-component';

const ProductList = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user_data"))
    const [data, setData] = useState()

    const columns = [
        {
            name: 'Name',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Category',
            selector: row => row?.categories ? row.categories.map((item) => item.name).join(","): "-",
        },
        {
            name: 'Price',
            selector: row => "Npr." + row.actual_price,
        },
        {
            name: 'Stock',
            selector: row => row.stock,
        },
        {
            name: 'Status',
            selector: row => <Status status={row.status} />,
        },
        {
            name: 'Action',
            selector: row => <Actions id={row._id} type="product" deleteAction={deleteAction} />,
        },
    ];

    let product_svc = new ProductService()
    const getData = useCallback(async () => {
        try {
            let response = await product_svc.getAllList()
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
            let response = await product_svc.deleteById(id)
            if (response.status) {
                toast.success("Product deleted successfully!!")
                getData()
            }
        } catch (excep) {
            toast.error(excep)
        }
    }

    return (<>
        <div className="container-fluid">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h3 className="mb-2">Product lists</h3>
                <Breadcrumb role={loggedInUser.role} title="Product" />
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
                                        <NavLink to="/admin/product/create" className="btn btn-sm btn-success btn-rounded mb-2 mr-2">
                                            <i className="fa fa-plus mr-2"></i>Add New Product
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                    responsive
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
export default ProductList