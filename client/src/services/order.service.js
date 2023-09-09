import API_ENDPOINTS from "../config/api-endpoints.config";
import HttpRequestService from "./http-request.service";
class OrderService extends HttpRequestService{
    getOrderListByUser = async() =>{
        try {
            let response = await this.getRequest(API_ENDPOINTS.orderList,{strict:true})
            return response
        } catch (error) {
            throw error
        }
    }
    getAllOrders = async () => {
        try {
            let response = await this.getRequest(API_ENDPOINTS.allOrders, {strict: true})
            return response
        } catch (error) {
            throw error
        }
    }
    getOrderDetailsById = async (id) => {
        try {
            let response = await this.getRequest(API_ENDPOINTS.order+"/" + id, {strict:true})
            return response
        } catch (error) {
            throw error
        }
    }
    deleteById = async (id) => {
        try{
            let response = await this.deleteRequest(API_ENDPOINTS.order+"/"+id, {strict:true})
            return response
        }catch(excep){
            throw excep
        }
    }
}
export default new OrderService();
export const order_svc = new OrderService()