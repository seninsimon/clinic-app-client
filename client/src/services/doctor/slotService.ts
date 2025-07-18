import axiosInstance from "../../api/axiosInterceptor";

// Get slots for selected day
export const getSlotsByDay = async (day: string) => {
  const response = await axiosInstance.get(`/doctor/slots/${day}`);
  
  // Convert the slots to { start, end } only
  return response.data.slots.map((slot: any) => ({
    start: slot.start,
    end: slot.end,
  }));
};


// Save/update slots
export const setSlotsForDay = async (day: string, slots: { start: string; end: string }[]) => {
  const response = await axiosInstance.put("/doctor/set-slot", { day, slots });
  return response.data.message;
};

// Delete slots for selected day
export const deleteSlotsByDay = async (day: string) => {
  const response = await axiosInstance.delete(`/doctor/slots/${day}`);
  return response.data.message;
};
