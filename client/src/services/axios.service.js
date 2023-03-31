import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server timed out ...",
    headers: {
        "accept": "application/json"
    }
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (reject) => {
        if(reject.response.status === 401){
            localStorage.removeItem("user_data")
            localStorage.removeItem("user_token")
            window.location.href ="/login"
        }else if(reject.response.status === 403){
            toast.warning("You do not have privilage to access this!!")
            window.location.href ="/"
        }else if(reject.response.status === 404){
            toast.warning("Endpoint doesn't exists")
        }else{
            throw reject.response.data
        }
    })
export default axiosInstance;