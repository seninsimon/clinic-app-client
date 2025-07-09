import axiosInstance from "../../api/axiosInterceptor";

export const fetchPatients = async () => {
  const res = await axiosInstance.get("/admin/patients");
  console.log(res)
  return res.data;
};

export const togglePatientBlockStatus = async (id: string, block: boolean) => {
  return axiosInstance.patch(`/admin/patient-block/${id}`, { block });
};
