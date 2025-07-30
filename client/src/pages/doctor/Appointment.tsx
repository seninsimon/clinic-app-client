// src/pages/AppointmentSchedule.tsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInterceptor';
import type { IUser } from '../../types/UserType';
import type { IAppointment } from '../../types/AppointmentType';

interface IAppointmentWithPatient extends IAppointment {
  patientDetails: IUser;
}

const AppointmentSchedule: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointmentWithPatient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get('/doctor/patient-appointments');
      console.log(res);
      setAppointments(res.data?.appointments ?? []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await axiosInstance.patch(`/doctor/patient-appointments/${id}`, { status });
      fetchAppointments(); // Refresh data
    } catch (err) {
      console.error('Error updating appointment status:', err);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading appointments...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Appointment Schedule</h2>

      {appointments.length === 0 ? (
        <div className="text-gray-600">No appointments found.</div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border"
            >
              <div className="flex items-start gap-4 w-full">
                {/* Patient Profile Picture */}
                {appt.patientDetails?.profilePicture && (
                  <img
                    src={appt.patientDetails.profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                )}

                {/* Patient Details */}
                <div className="flex-grow">
                  <p className="font-semibold text-lg">{appt.patientDetails?.name}</p>
                  <p className="text-sm text-gray-600">{appt.patientDetails?.email}</p>
                  <p className="text-sm text-gray-600">📞 {appt.patientDetails?.phone}</p>
                  <p className="text-sm text-gray-600">⚧ {appt.patientDetails?.gender}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    📅 {appt.date} | 🕒 {appt.start} - {appt.end}
                  </p>
                  <p className="text-sm text-gray-800 mt-1">
                    Reason: {appt.reason || 'Not specified'}
                  </p>
                  <p className="text-sm mt-1">
                    Status: <span className="font-medium text-blue-600">{appt.status}</span>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              {appt.status === 'booked' && (
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => updateStatus(appt._id!, 'confirmed')}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => updateStatus(appt._id!, 'cancelled')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentSchedule;
