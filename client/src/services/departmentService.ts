// src/services/departmentService.ts

import axiosInstance from "../api/axiosInterceptor";

// ✅ Fetch all departments
export const fetchAlldepartments = async () => {
  const response = await axiosInstance.get("/admin/fetch-departments");
  return response.data.fetchDept.dept;
};

// ✅ Add new department
export const addDepartment = async (data: {
  deptName: string;
  description: string;
}) => {
  const response = await axiosInstance.post("/admin/add-department", data);
  return response.data;
};

// ✅ Update department (fixed URL)
export const updateDepartment = async (data: {
  id: string;
  deptName: string;
  description: string;
}) => {
  const response = await axiosInstance.put(`/admin/departments/${data.id}`, {
    deptName: data.deptName,
    description: data.description,
  });
  return response.data;
};

// ✅ Delete department (fixed URL)
export const deleteDepartment = async (id: string) => {
  const response = await axiosInstance.delete(`/admin/departments/${id}`);
  return response.data;
};
