import HttpRequestService from './http-request.service'
class ProductService extends HttpRequestService {
    listSearchData = async (keyword) => {
        try {
            let response = await this.getRequest('/product/search?keyword=' + keyword)
            return response
        } catch (error) {
            throw error
        }
    }
    getCartDetail = async (cart) => {
        try {
            let response = await this.postRequest('/order/cart', {cart})
            return response
        } catch (error) {
            throw error
        }
    }
    createOrder = async (orderDetail) => {
        try {
            let response = await this.postRequest('/order', orderDetail, {strict:true})
            return response
        } catch (error) {
            throw error
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();
export const product_svc = new ProductService()