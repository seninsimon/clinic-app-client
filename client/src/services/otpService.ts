import axiosInstance from "../api/axiosInterceptor"

interface OtpInput
{
    email : string,
    otp : string
}



export const resendOtp = async(data : string)=>
{
    const response = await axiosInstance.post("/send-otp" , data)
    console.log(response)
    return response

}

export const otpverify = async(data : OtpInput)=>
{
    const response = await axiosInstance.post("/verify-otp" , data)
    console.log(response)
    return response

}