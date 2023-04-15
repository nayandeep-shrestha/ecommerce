import API_ENDPOINTS from "../config/api-endpoints.config";
import HttpRequestService from "./http-request.service";
import { toast } from 'react-toastify';

class AuthService extends HttpRequestService {
    login = async (data) => {
        try {
            let user_data = await this.postRequest(API_ENDPOINTS.login, data)
            localStorage.setItem("user_token", user_data.result.token)
            let json_string = JSON.stringify({
                name: user_data.result.detail.name,
                email: user_data.result.detail.email,
                role: user_data.result.detail.role,
                id: user_data.result.detail._id
            }) 
            localStorage.setItem("user_data", json_string)
            toast.success(user_data.msg)
            return {
                name: user_data.result.detail.name,
                email: user_data.result.detail.email,
                role: user_data.result.detail.role,
                id: user_data.result.detail._id,
            }
        } catch (err) {
            throw err
        }
    }
    register = async (data) =>{
        try {
            let user_register = await this.postRequest(API_ENDPOINTS.register, data)
            return user_register.status
        } catch (error) {
            throw error
        }
    }
    getMyProfile= async () => {
        try{
            let user = await this.getRequest(API_ENDPOINTS.me, {strict: true})
            if(user) {
                return user
            }else{
                throw user
            }
        }catch(excep){
            throw excep
        }
    }
    checkUser = async (email) => {
        try {
            let response = await this.postRequest(API_ENDPOINTS.checkUser, email)
            return response
        } catch (error) {
            throw error
        }
    }
    otpVerify = async (otpData) => {
        try {
            let response = await this.postRequest(API_ENDPOINTS.otpVerify, otpData)
            return response
        } catch (error) {
            throw error
        }
    }
    resendOTP = async (otpData) => {
        try {
            let response = await this.postRequest(API_ENDPOINTS.resendOTP, otpData)
            // console.log(response)
            return response
        } catch (error) {
            throw error
        }
    }
    changePw = async (updatedDetails) => {
        try {
            let response = await this.putRequest(API_ENDPOINTS.changePw, updatedDetails)
            return response
        } catch (error) {
            throw error
        }
    }
}

export default AuthService