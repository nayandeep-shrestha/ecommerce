import API_ENDPOINTS from "../../../config/api-endpoints.config"
import HttpRequestService from "../../../services/http-request.service"

class UserService extends HttpRequestService{
    getAllList =async () => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.user, {strict:true})
            return data
        }catch(excep){
            throw excep
        }
    }

    getAllSeller =async () => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.user, {strict:true})
            let seller = data.result.filter((item) => item.role === 'seller')
            return seller
        }catch(excep){
            throw excep
        }
    }

    createUser = async (data) => {
        try{
            let response = await this.postRequest(API_ENDPOINTS.user, data, {strict: true, file: true})
            return response
        }catch(excep){
            throw excep
        }
    }
    deleteById = async (id) => {
        try{
            let response = await this.deleteRequest(API_ENDPOINTS.user+"/"+id, {strict:true})
            return response
        }catch(excep){
            throw excep
        }
    }
    getById = async (id) => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.user+"/"+id, {strict: true})
            return data
        }catch(excep){
            throw excep
        }
    }
    updateById= async (data,id) => {
        try{
            let response = await this.putRequest(API_ENDPOINTS.user+"/"+id, data, {strict:true, file:true})
            return response
        }catch(excep){
            throw excep 
        }
    }
}
export const user_svc = new UserService()
export default UserService