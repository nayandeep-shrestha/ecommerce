import React,{ useCallback, useEffect, useState } from "react"
import Breadcrumb from "../breadcumb.component"
import "./order.css"
import { NavLink } from "react-router-dom"
import { order_svc } from "../../../services/order.service"
import { toast } from "react-toastify"
import { Actions,Status } from "../../common/common-components"
import DataTable from 'react-data-table-component';

const OrderList = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user_data"))

    let [orderDetails, setOrderDetails] = useState()
    const getOrderList = useCallback(async () => {
        try {
            let orderList = await order_svc.getAllOrders()
            if (orderList.status) {
                setOrderDetails(orderList.result)
            }
            // console.log(orderList.result)

            
        } catch (error) {
            console.log(error)
        }
    }, [])

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    const getDate = (orderedDate) =>{
        var fullDate = orderedDate.split('T')[0];
        var monthNum = fullDate.substring(fullDate.indexOf('-')+1,fullDate.lastIndexOf('-'))
        var year = fullDate.substring(0, fullDate.indexOf('-'))
        var date = fullDate.substring(fullDate.lastIndexOf('-')+1, fullDate.length)
        if (monthNum.indexOf('0') === 0){
            monthNum= Number(monthNum.charAt(monthNum.length-1))-1
            return monthNames[monthNum] + " " + date + ", " + year
        }else{
            monthNum = Number(monthNum)-1
            return monthNames[monthNum] + " " + date + ", " + year
        }
         
    }

    useEffect(() => {
        getOrderList()
    }, [])
    const columns = [
        {
            name: 'Order ID',
            selector: row => row._id,
            sortable: true
        },
        {
            name: 'Date',
            selector: row => getDate(row.createdAt)
        },
        {
            name: 'Total',
            selector: row => "Npr." + row.total_amount
        },
        {
            name: 'Status',
            selector: row => <Status status={row.status} />,
        },
        {
            name: 'Action',
            selector: row => <Actions id={row._id} type="order" deleteAction={deleteAction} />,
        },
    ];


    const deleteAction = async (id) => {
        try {
            let response = await order_svc.deleteById(id)
            if (response.status) {
                toast.success("Order deleted successfully!!")
                // getData()
            }
        } catch (excep) {
            toast.error(excep)
        }
    }

    return (<>
        <div className="container-fluid">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h3 className="mb-2">Order lists</h3>
                <Breadcrumb role={loggedInUser.role} title="Order" />
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
                            </div>
                            <div className="table-responsive">
                                <DataTable
                                    columns={columns}
                                    data={orderDetails}
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
export default OrderList