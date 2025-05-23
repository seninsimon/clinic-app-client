import { useQuery , useQueryClient , useMutation,  } from "@tanstack/react-query";
import { fetchAlldepartments , addDepartment } from "../services/departmentService";



export const useFetchDepartment = ()=>
{
    return useQuery({
        queryKey : ["department"],
        queryFn : fetchAlldepartments
    })
}


export const useCreateDepartment = ()=>
{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : addDepartment, // mutaton fn will only take one object
        onSuccess : ()=> 
        {
            queryClient.invalidateQueries({queryKey : ["department"]})
        }
    })
}