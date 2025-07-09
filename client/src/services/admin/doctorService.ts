// src/services/admin/adminDoctorService.ts
import axiosInstance from "../../api/axiosInterceptor";

export const fetchAllDoctors = async () => {
  const res = await axiosInstance.get("/admin/fetch-doctors");
  return res.data.doctors;
};

export const verifyDoctorStatus = async (doctorId: string, status: "Approved" | "Rejected") => {
  const res = await axiosInstance.patch(`/admin/doctors-verify/${doctorId}`, { status }); 
  return res.data;
};


export const doctorDetails = async () => {
  const res = await axiosInstance.get("/admin/doctor-details");
  return res.data.doctors; 
};



export const toggleDoctorBlockStatus = async (
  doctorId: string,
  isBlocked: boolean
) => {
  const res = await axiosInstance.patch(`/admin/doctors-block/${doctorId}`, {
    isBlocked,
  });
  return res.data;
};


