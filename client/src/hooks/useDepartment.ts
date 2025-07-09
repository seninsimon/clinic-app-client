// src/hooks/useDepartment.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAlldepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/departmentService";

export const useFetchDepartment = () => {
  return useQuery({
    queryKey: ["department"],
    queryFn: fetchAlldepartments,
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};

export const  useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["department"] });
    },
  });
};
