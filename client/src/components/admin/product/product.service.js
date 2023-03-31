import API_ENDPOINTS from "../../../config/api-endpoints.config"
import HttpRequestService from "../../../services/http-request.service"

class ProductService extends HttpRequestService{
    getAllList =async () => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.product)
            return data
        }catch(excep){
            throw excep
        }
    }
    createProduct = async (data) => {
        try{
            let response = await this.postRequest(API_ENDPOINTS.product, data, {strict: true, file: true})
            return response
        }catch(excep){
            throw excep
        }
    }
    deleteById = async (id) => {
        try{
            let response = await this.deleteRequest(API_ENDPOINTS.product+"/"+id, {strict:true})
            return response
        }catch(excep){
            throw excep
        }
    }
    getById = async (id) => {
        try{
            let data = await this.getRequest(API_ENDPOINTS.product+"/"+id)
            return data
        }catch(excep){
            throw excep
        }
    }
    updateById= async (data,id) => {
        try{
            let response = await this.putRequest(API_ENDPOINTS.product+"/"+id, data, {strict:true, file:true})
            return response
        }catch(excep){
            throw excep 
        }
    }
}
export const product_svc = new ProductService()
export default ProductService