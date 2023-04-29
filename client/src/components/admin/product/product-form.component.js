/* eslint-disable array-callback-return */
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { category_svc } from "../category/category.service";
import { brand_svc } from "../brand/brand.service";
import { user_svc } from "../user/user.service";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select'
import commonFunc from "../../../config/function";

const ProductForm = ({ submitAction, defaultValue }) => {
    let [categories, setCategories] = useState()
    let [brand, setBrand] = useState()
    let [seller, setSeller] = useState()
    const [isClearable] = useState(true);

    const schema = Yup.object({
        title: Yup.string().required().nullable(),
        status: Yup.string().required().nullable(),
        description: Yup.string().nullable(),
        price: Yup.number().required().min(1),
        discount: Yup.number().nullable().default(0),
        categories: Yup.object().nullable(),
        brand: Yup.object().nullable(),
        stock: Yup.number().nullable(),
        sku: Yup.string().nullable(),
        seller: Yup.object().nullable()
    })

    const formik = useFormik({
        initialValues: defaultValue,
        validationSchema: schema,
        onSubmit: async (values) => {
            if (values.brand) {
                values.brand = values.brand.value
            } else {
                values.brand = null
            }

            if (values.seller) {
                values.seller = values.seller.value
            } else {
                values.seller = null
            }

            if (values.categories) {
                let sel_categories = []
                values.categories.map((item) => {
                    sel_categories.push(item.value)
                })
                values.categories = sel_categories.join(',')
            } else {
                values.categories = null
            }
            submitAction(values)
        }
    })

    const getAllCategories = useCallback(async () => {
        let response = await category_svc.getAllList()
        if (response.status) {
            setCategories(response.result)
        }
    },[])

    const getAllBrands = useCallback(async () => {
        let response = await brand_svc.getAllList()
        if (response.status) {
            setBrand(response.result)
        }
    },[])

    const getAllSeller = useCallback(async () => {
        let response = await user_svc.getAllSeller()
        if (response) {
            setSeller(response)
        }
    },[])


    const imageValidate = (e) => {
        let files = Object.values(e.target.files)   // converts objects into array of objects
        let validImages = []
        let err_msg = []
        files.map((item) => {
            let ext = (item.name.split(".")).pop()

            if (["jpg", "jpeg", "svg", "png", "webp", "gif"].includes(ext.toLowerCase())) {
                validImages.push(item)
            } else {
                err_msg.push(item.name)
            }

        })
        if (err_msg.length > 0) {
            formik.setErrors({
                ...formik.errors,
                images: err_msg.join(",") + " does not have a valid format"
            })
        } else {
            formik.setErrors({
                ...formik.errors,
                images: null
            })
        }
        formik.setValues({
            ...formik.values,
            images: validImages
        })
    }

    useEffect(() => {
        getAllCategories()
        getAllBrands()
        getAllSeller()
        formik.setValues({
            ...defaultValue
        })
    }, [defaultValue])

    return (<>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Name : </label></div>
                <div className="col-9 align-self-end"><input type="text" className="form-control"
                    name="title" placeholder="Product name" onChange={formik.handleChange} value={formik.values?.title ?? ""} /></div>
                <span className="text-danger">
                    {formik.errors?.title}
                </span>
            </div>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Description : </label></div>
                <div className="col-9 align-self-end">
                    <CKEditor
                        name="description"
                        editor={ClassicEditor}
                        data={formik.values?.description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            if (defaultValue?.description) {
                                formik.setValues({
                                    ...defaultValue,
                                    description: data
                                })
                            } else {
                                formik.setValues({
                                    ...formik.values,
                                    description: data
                                })
                            }
                        }}

                    />
                </div>
                <span className="text-danger">
                    {formik.errors?.description}
                </span>
            </div>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Category : </label></div>
                <div className="col-9 align-self-end">
                    <Select
                        required
                        isMulti
                        name="categories"
                        options={
                            categories && categories.map((item, key) => (
                                { value: item._id, label: commonFunc.capFirst(item.name) }
                            ))
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={formik.values?.categories}
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                categories: e
                            })
                        }}
                    />
                </div>
                <span className="text-danger">
                    {formik.errors?.categories}
                </span>
            </div>

            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Brand : </label></div>
                <div className="col-9 align-self-end">
                    <Select
                        required
                        name="brand"
                        options={
                            brand && brand.map((item, key) => (
                                { value: item._id, label: item.title }
                            ))
                        }
                        className="basic-single"
                        classNamePrefix="select"
                        value={formik.values?.brand}
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                brand: e
                            })
                        }}
                    />
                </div>
                <span className="text-danger">
                    {formik.errors?.brand}
                </span>
            </div>

            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Price : </label></div>
                <div className="col-9 align-self-end"><input type="number" className="form-control"
                    name="price" placeholder="Price (Npr.)" min={1} onChange={formik.handleChange} value={formik.values?.price ?? ""} required /></div>
                <span className="text-danger">
                    {formik.errors?.price}
                </span>
            </div>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Discount(%) : </label></div>
                <div className="col-9 align-self-end"><input type="number" className="form-control"
                    name="discount" placeholder="Enter discount" min={0} onChange={formik.handleChange} value={formik.values?.discount ?? ""} /></div>
                <span className="text-danger">
                    {formik.errors?.discount}
                </span>
            </div>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Stock quantity : </label></div>
                <div className="col-9 align-self-end"><input type="number" className="form-control"
                    name="stock" placeholder="Enter product quantity" min={1} onChange={formik.handleChange} value={formik.values?.stock ?? ""} /></div>
                <span className="text-danger">
                    {formik.errors?.stock}
                </span>
            </div>
            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">SKU : </label></div>
                <div className="col-9 align-self-end"><input type="text" className="form-control"
                    name="sku" placeholder="Stock Keeping Unit" onChange={formik.handleChange} value={formik.values?.sku ?? ""} /></div>
                <span className="text-danger">
                    {formik.errors?.sku}
                </span>
            </div>

            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Seller : </label></div>
                <div className="col-9 align-self-end">
                    <Select
                        isClearable={isClearable}
                        classNamePrefix="select"
                        className="basic-single"
                        options={
                            seller && seller.map((item, key) => (
                                { value: item._id, label: commonFunc.capFirst(item.name) }
                            ))
                        }
                        name='seller'
                        value={formik.values?.seller}
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                seller: e
                            })
                        }}
                    />
                </div>
                <span className="text-danger">
                    {formik.errors?.seller}
                </span>
            </div>

            <div className="form-group row">
                <div className="col-3"><label className="ml-3 text-dark">Status : </label></div>
                <div className="col-9 align-self-end">
                    <select className="form-control" name="status" required onChange={formik.handleChange} value={formik.values?.status ?? ""}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <span className="text-danger">
                    {formik.errors?.status}
                </span>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 ml-3 text-dark">Images : </label>
                <div className="col-sm-3">
                    <input
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={imageValidate}
                    />
                    <span className="text-danger">{formik.errors?.images}</span>
                </div>
                <div className="col-sm-3">
                    {/* {
                        formik.values?.images && formik.values.images.map((image) => <></>)
                    } */}
                </div>
            </div>

            <div className="form-group row mt-3">
                <div className="col-9 offset-sm-3">
                    <button type="reset" className="btn btn-danger mr-3 rounded-pill">
                        Reset
                    </button>
                    <button type="submit" className=" btn btn-success rounded-pill">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </>)
}

export default ProductForm