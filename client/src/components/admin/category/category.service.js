import API_ENDPOINTS from "../../../config/api-endpoints.config"
import HttpRequestService from "../../../services/http-request.service"

class CategroyService extends HttpRequestService{
    getAllList =async () => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.category)
            return data
        }catch(excep){
            throw excep
        }
    }
    createCategory = async (data) => {
        try{
            let response = await this.postRequest(API_ENDPOINTS.category, data, {strict: true, file: true})
            return response
        }catch(excep){
            throw excep
        }
    }
    deleteById = async (id) => {
        try{
            let response = await this.deleteRequest(API_ENDPOINTS.category+"/"+id, {strict:true})
            return response
        }catch(excep){
            throw excep
        }
    }
    getById = async (id) => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.category+"/"+id)
            return data
        }catch(excep){
            throw excep
        }
    }
    updateById= async (data,id) => {
        try{
            let response = await this.putRequest(API_ENDPOINTS.category+"/"+id, data, {strict:true, file:true})
            return response
        }catch(excep){
            throw excep 
        }
    }
    getCategoryBySlug = async (slug) => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.category+"/products-list/"+slug)
            return data
        }catch(excep){
            throw excep
        }
    }
}
export const category_svc = new CategroyService()
export default CategroyService