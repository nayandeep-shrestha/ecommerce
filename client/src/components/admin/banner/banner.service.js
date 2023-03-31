import API_ENDPOINTS from "../../../config/api-endpoints.config"
import HttpRequestService from "../../../services/http-request.service"

class BannerService extends HttpRequestService{
    getAllList =async () => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.banner)
            return data
        }catch(excep){
            throw excep
        }
    }
    createBanner = async (data) => {
        try{
            let response = await this.postRequest(API_ENDPOINTS.banner, data, {strict: true, file: true})
            return response
        }catch(excep){
            throw excep
        }
    }
    deleteById = async (id) => {
        try{
            let response = await this.deleteRequest(API_ENDPOINTS.banner+"/"+id, {strict:true})
            return response
        }catch(excep){
            throw excep
        }
    }
    getById = async (id) => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.banner+"/"+id)
            return data
        }catch(excep){
            throw excep
        }
    }
    updateById= async (data,id) => {
        try{
            let response = await this.putRequest(API_ENDPOINTS.banner+"/"+id, data, {strict:true, file:true})
            return response
        }catch(excep){
            throw excep 
        }
    }
}
export const banner_svc = new BannerService()
export default BannerService