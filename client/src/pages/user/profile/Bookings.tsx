import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInterceptor";

interface Appointment {
  _id: string;
  doctor: {
    name: string;
  };
  date: string;
  start: string;
  end: string;
}

const Bookings: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/appointments/user");
      setAppointments(res.data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      setCancelling(id);
      await axiosInstance.delete(`/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to cancel appointment");
    } finally {
      setCancelling(null);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && appointments.length === 0 && <p>No appointments found.</p>}

      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p><strong>Doctor:</strong> {appt.doctor?.name || "Unknown"}</p>
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
              <p>
                <strong>Time:</strong> {appt.start} - {appt.end}
              </p>
            </div>
            <button
              onClick={() => handleCancel(appt._id)}
              disabled={cancelling === appt._id}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {cancelling === appt._id ? "Cancelling..." : "Cancel"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
