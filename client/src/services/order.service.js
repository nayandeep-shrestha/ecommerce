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
}
export default new OrderService();
export const order_svc = new OrderService()