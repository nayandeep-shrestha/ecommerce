import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Components from "./components"
import PrivateComponent from "./components/auth/private-routes.component"
import CustomerComponent from "./components/auth/customer-routes.component"
import Pages from "./pages"
import { ToastContainer } from "react-toastify"

const Routing = () => {
    return (
        <>
            <ToastContainer autoClose={3000} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Pages.HomeLayout />}>
                        <Route index element={<Pages.HomePage />} />
                        <Route path="register" element={<Pages.Register />} />
                        <Route path="login" element={<Pages.LoginLayout />} >
                            <Route index element={<Pages.Login />} />
                            <Route path="forgot-password" element={<Pages.ForgotPassword />} />
                            <Route path="verify-otp/:id" element={<Pages.VerifyOTP />} />
                            <Route path="change-password/:id" element={<Pages.ChangePW />} />
                        </Route>
                        <Route path="search" element={<Pages.SearchPage />} />
                        <Route path="productCategory/:slug" element={<Pages.CategoryProducts />} />
                        <Route path="brand-products/:slug" element={<Pages.BrandProducts />} />
                        <Route path="products/:id" element={<Pages.ProductDetail />} />
                        <Route path="cart" element={<Pages.Cart />}></Route>
                        <Route path="checkout" element={<Pages.Checkout />}></Route>
                        <Route path="customer" element={<CustomerComponent component={<Pages.CustomerLayout/>} />}>
                            <Route path="orders" element={<Components.Orders/>}/>
                            <Route path="profile" element={<Components.Profile/>}/>
                            <Route path="logout" element={<Components.Logout/>}/>
                            <Route path="change-password" element={<Components.ChangePassword/>}/>
                        </Route> 
                    </Route>

                    <Route path="/admin" element={<PrivateComponent component={<Pages.AdminLayout />} />}>
                        <Route index element={<Components.AdminDashboard />} />

                        <Route path="banner" element={<Components.BannerList />} />
                        <Route path="banner/create" element={<Components.BannerCreate />} />
                        <Route path="banner/:id" element={<Components.BannerEdit />} />

                        <Route path="brand" element={<Components.BrandList />} />
                        <Route path="brand/create" element={<Components.BrandCreate />} />
                        <Route path="brand/:id" element={<Components.BrandEdit />} />

                        <Route path="category" element={<Components.CategoryList />} />
                        <Route path="category/create" element={<Components.CategoryCreate />} />
                        <Route path="category/:id" element={<Components.CategoryEdit />} />

                        <Route path="user" element={<Components.UserList />} />
                        <Route path="user/create" element={<Components.UserCreate />} />
                        <Route path="user/:id" element={<Components.UserEdit />} />

                        <Route path="product" element={<Components.ProductList />} />
                        <Route path="product/create" element={<Components.ProductCreate />} />
                        <Route path="product/:id" element={<Components.ProductEdit />} />

                        <Route path="order" element={<Components.OrderList />} />
                        <Route path="order/:id" element={<Components.OrderEdit />} />
                    </Route>

                    <Route path="*" element={<Pages.Error />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing