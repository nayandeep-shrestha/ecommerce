import { createSlice } from "@reduxjs/toolkit";
const OTPslicer = createSlice({
    name:"otp",
    initialState: {
        otpDetail: null
    },
    reducers:{
        otpEmail: (state, action) => {
            let current_detail= action.payload
            console.log(current_detail)
            state.otpDetail = current_detail
        },
        removeOTPemail: (state, action) => {
            state.otpDetail = null
        }
    }
})
export const {otpEmail, removeOTPemail } = OTPslicer.actions
export default OTPslicer.reducer