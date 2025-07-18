
import axiosInstance from "../../api/axiosInterceptor";

export const bookAppointment = async ({
  doctorId,
  date,
  slot,
}: {
  doctorId: string;
  date: string;
  slot: { start: string; end: string };
}) => {
  const response = await axiosInstance.post("/appointments/book", {
    doctorId,
    date,
    slot,
  });
  return response.data;
};
