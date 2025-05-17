import axiosInstance from "../api/axiosInterceptor";


interface LoginPayloads {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
}

export const signup = async (Payload : LoginPayloads )=>
{
    const response = await axiosInstance.post("/signup" , Payload)
    return response
}