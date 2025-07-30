import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInterceptor";
import toast, { Toaster } from "react-hot-toast";

interface Doctor {
  _id: string;
  name: string;
  specialisation?: string;
  fee?: number;
}

interface Appointment {
  _id: string;
  doctor: Doctor;
  date: string;
  start: string;
  end: string;
  reason?: string;
  status: "booked" | "completed" | "cancelled" | "confirmed";
  createdAt?: string;
}

const Bookings: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Format time to AM/PM
  const formatTimeToAMPM = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Fetch user's appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/appointments/user");
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments", error);
      toast.error("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel appointment by user
  const cancelAppointment = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/appointment-cancel/${id}`);
      toast.success(res.data.message || "Appointment cancelled successfully");

      // Update state
      setAppointments((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: "cancelled" } : app
        )
      );
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Failed to cancel appointment.";
      toast.error(errMsg);
      console.error("Cancel error:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border rounded-lg p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Doctor:</strong> {appointment.doctor?.name}
                </p>
                {appointment.doctor?.specialisation && (
                  <p>
                    <strong>Specialization:</strong>{" "}
                    {appointment.doctor.specialisation}
                  </p>
                )}
                {appointment.doctor?.fee !== undefined && (
                  <p>
                    <strong>Fee:</strong> ₹{appointment.doctor.fee}
                  </p>
                )}
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {formatTimeToAMPM(appointment.start)} -{" "}
                  {formatTimeToAMPM(appointment.end)}
                </p>
                {appointment.reason && (
                  <p>
                    <strong>Reason:</strong> {appointment.reason}
                  </p>
                )}
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">{appointment.status}</span>
                </p>
              </div>

              {/* ✅ Show cancel button only if booked */}
              {appointment.status === "booked" && (
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
