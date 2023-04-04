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
}

export default new ProductService();
export const product_svc = new ProductService()