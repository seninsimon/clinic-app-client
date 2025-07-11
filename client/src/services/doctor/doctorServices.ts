import axiosInstance from "../../api/axiosInterceptor";

export interface DoctorRegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  specialisation: string;
  experience: number;
  fee: number;
  profilePicture: string; // uploaded S3 URL
  medicalLicence: string; // uploaded S3 URL
  additionalInfo?: string;
}

export interface DoctorLoginPayload {
  email : string , 
  password : string
}

export const registerDoctor = async (payload: DoctorRegisterPayload) => {
  const response = await axiosInstance.post("/doctor-signup", payload);

  return response.data;
};


export const loginDoctor = async (payload : DoctorLoginPayload) =>
{
  const response = await axiosInstance.post("/doctor/login" , payload)

  return response.data
}


export const getDoctorsByDepartment = async (deptId: string) => {
  const response = await axiosInstance.get(`/user/doctors/department/${deptId}`);
  return response.data.doctors;
};
