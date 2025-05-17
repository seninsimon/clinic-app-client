import axiosInstance from "../api/axiosInterceptor"

interface LoginInput {
    email : string,
    password : string
}


export const login = async(data : LoginInput)=>
{
    const response = await axiosInstance.post("/login" , data)
    console.log(response)
    return response

}