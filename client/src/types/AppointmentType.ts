// src/types/IAppointment.ts
import { Types } from "mongoose";

export interface IAppointment {
  _id?: string;
  doctor: Types.ObjectId | string;
  patient: Types.ObjectId | string;
  date: string; // Format: "YYYY-MM-DD"
  start: string; // Format: "HH:mm"
  end: string;   // Format: "HH:mm"
  reason?: string;
  status?: "booked" | "completed" | "cancelled";
  createdAt?: Date;
}
