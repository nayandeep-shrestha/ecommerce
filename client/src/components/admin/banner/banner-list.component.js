import React, { useCallback, useEffect, useState } from "react"
import Breadcrumb from "../breadcumb.component"
import "./banner.css"
import { NavLink } from "react-router-dom"
import BannerService from "./banner.service"
import { toast } from "react-toastify"

import { Actions, LightBox, Status } from "../../common/common-components"

const BannerList = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user_data"))
    const [data, setData] = useState()
 
    let banner_svc = new BannerService()
    const getData = useCallback(async () => {
        try {
            let response = await banner_svc.getAllList()
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

    const deleteAction= async (id) => {
        try{
            let response = await banner_svc.deleteById(id)
            if(response.status){
                toast.success("Banner deleted!!")
                getData()
            }
        }catch(excep){
            toast.error(excep)
        }
    }

    // useEffect(() => {
    //     document.body.classList.add('active')
    //     return () => {
    //       document.body.classList.remove('active')
    //     }
    //   }, [])
    return (<>
        <div className="container-fluid">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h3 className="mb-2">Banner lists</h3>
                <Breadcrumb role={loggedInUser.role} title="Banner" />
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
                                        <NavLink to="/admin/banner/create" className="btn btn-sm btn-success btn-rounded mb-2 mr-2">
                                            <i className="fa fa-plus mr-2"></i>Add New Banner
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="table-secondary text-dark">
                                        <tr>
                                            <th>Title</th>
                                            <th>Link</th>
                                            <th>Image</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data && data.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.title}</td>
                                                    <td>{item.link}</td>
                                                    <td>{item.image ?
                                                            <>
                                                                <LightBox image={process.env.REACT_APP_IMAGE_URL + "/banner/" + item.image} name={item.image} />
                                                            </>
                                                            :
                                                            <>No  Image found</>
                                                        }
                                                    </td>
                                                    <td>
                                                        <Status status={item.status} />
                                                    </td>
                                                    <td>{item.created_at}</td>
                                                    <td>
                                                        <Actions id={item._id} type="banner" deleteAction={deleteAction}/>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default BannerList