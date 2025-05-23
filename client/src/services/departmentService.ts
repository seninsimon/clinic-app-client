
import axiosInstance from "../api/axiosInterceptor"






export const fetchAlldepartments = async()=>
{
    const response = await axiosInstance.get("/admin/fetch-departments")
    return  response.data.fetchDept.dept
}

export const addDepartment = async(data :{deptName : string , description : string})=>
{
    const response = await axiosInstance.post("/admin/add-department" , data )
    return response.data

}