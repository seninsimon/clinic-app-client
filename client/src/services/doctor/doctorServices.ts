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
  email: string;
  password: string;
}

export const registerDoctor = async (payload: DoctorRegisterPayload) => {
  const response = await axiosInstance.post("/doctor-signup", payload);
  return response.data;
};

export const loginDoctor = async (payload: DoctorLoginPayload) => {
  const response = await axiosInstance.post("/doctor/login", payload);
  return response.data;
};

export const getDoctorsByDepartment = async (deptId: string) => {
  const response = await axiosInstance.get(`/user/doctors/department/${deptId}`);
  return response.data.doctors;
};

// ✅ NEW: Get Doctor Details by ID
export const getDoctorById = async (doctorId: string) => {
  const response = await axiosInstance.get(`/user/doctor/${doctorId}`);
  return response.data.doctor;
};

export const getSlotsForDoctorByDate = async (doctorId: string, date: string) => {
  const response = await axiosInstance.get(`/user/doctor/${doctorId}/slots?date=${date}`);
  return response.data.slots;
};

export const bookAppointment = async (payload: {
  doctor: string;
  date: string;
  start: string;
  end: string;
  reason?: string;
  fee: number;
}) => {
  const response = await axiosInstance.post("/appointments/book", payload);
  return response.data;
};
