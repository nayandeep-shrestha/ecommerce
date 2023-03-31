import API_ENDPOINTS from "../../../config/api-endpoints.config"
import HttpRequestService from "../../../services/http-request.service"

class BrandService extends HttpRequestService{
    getAllList =async () => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.brand)
            return data
        }catch(excep){
            throw excep
        }
    }
    createBrand = async (data) => {
        try{
            let response = await this.postRequest(API_ENDPOINTS.brand, data, {strict: true, file: true})
            return response
        }catch(excep){
            throw excep
        }
    }
    deleteById = async (id) => {
        try{
            let response = await this.deleteRequest(API_ENDPOINTS.brand+"/"+id, {strict:true})
            return response
        }catch(excep){
            throw excep
        }
    }
    getById = async (id) => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.brand+"/"+id)
            return data
        }catch(excep){
            throw excep
        }
    }
    updateById= async (data,id) => {
        try{
            let response = await this.putRequest(API_ENDPOINTS.brand+"/"+id, data, {strict:true, file:true})
            return response
        }catch(excep){
            throw excep 
        }
    }
    getBrandBySlug = async (brand) => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.brand+"/products-list/"+brand)
            return data
        }catch(excep){
            throw excep
        }
    }
}
export const brand_svc = new BrandService()
export default BrandService