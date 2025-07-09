import { useEffect, useState } from "react";
import {
  doctorDetails,
  toggleDoctorBlockStatus,
} from "../../services/admin/doctorService";
import CenteredConfirmationModal from "../../components/common/ConfirmationModal";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  experience: number;
  fee: number;
  profilePicture?: string;
  medicalLicence?: string;
  isBlocked: boolean;
}

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [confirmationDoctor, setConfirmationDoctor] = useState<{
    id: string;
    isBlocked: boolean;
  } | null>(null);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const data = await doctorDetails();
      setDoctors(data.filter((doc: any) => doc.status === "Approved"));
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  const handleBlockToggle = async (id: string, block: boolean) => {
    try {
      await toggleDoctorBlockStatus(id, block);
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === id ? { ...doc, isBlocked: block } : doc
        )
      );
    } catch (error) {
      console.error("Error updating doctor block status", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f7f9fb] min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 border-b pb-2">
        Doctor Management
      </h2>

      {doctors.length === 0 ? (
        <p className="text-gray-600 text-lg">No doctors found</p>
      ) : (
        <div className="space-y-4 relative">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-5 bg-blue-100 text-blue-900 font-semibold px-6 py-3 rounded-md shadow-sm">
            <p>Doctor ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Photo</p>
            <p className="text-right">Actions</p>
          </div>

          {/* Doctor Rows */}
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="relative bg-white p-4 sm:p-6 rounded-md shadow-md border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 sm:gap-6">
                <p className="text-gray-700 font-medium text-sm sm:text-base">
                  <span className="md:hidden font-semibold">Doctor ID: </span>
                  D-{doctor._id.slice(4, 8)}
                </p>

                <p className="text-gray-900 font-semibold text-sm sm:text-base">
                  <span className="md:hidden font-semibold">Name: </span>
                  {doctor.name}
                </p>

                <p className="text-gray-700 text-sm sm:text-base">
                  <span className="md:hidden font-semibold">Email: </span>
                  {doctor.email}
                </p>

                <div>
                  {doctor.profilePicture && (
                    <img
                      src={doctor.profilePicture}
                      alt="Profile"
                      className="w-14 h-14 object-cover rounded-full border"
                    />
                  )}
                </div>

                <div className="flex md:justify-end gap-2 sm:gap-1 flex-wrap">
                  <button
                    onClick={() =>
                      setConfirmationDoctor({
                        id: doctor._id,
                        isBlocked: !doctor.isBlocked,
                      })
                    }
                    className={`text-white px-4 py-1.5 text-sm rounded-md w-full md:w-auto ${
                      doctor.isBlocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {doctor.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() =>
                      setSelectedDoctorId((prev) =>
                        prev === doctor._id ? null : doctor._id
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 text-sm rounded-md w-full md:w-auto"
                  >
                    {selectedDoctorId === doctor._id ? "Hide" : "View"} Details
                  </button>
                </div>
              </div>

              {/* Doctor Details */}
              {selectedDoctorId === doctor._id && (
                <div className="mt-4 border-t pt-4 text-sm text-gray-800 space-y-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {doctor.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Experience:</span>{" "}
                      {doctor.experience} years
                    </p>
                    <p>
                      <span className="font-semibold">Fee:</span> ₹{doctor.fee}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={
                          doctor.isBlocked
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {doctor.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </p>
                  </div>

                  {doctor.medicalLicence && (
                    <p>
                      <a
                        href={doctor.medicalLicence}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline font-medium"
                      >
                        View Medical Licence
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Global Confirmation Modal */}
      <CenteredConfirmationModal
        isOpen={!!confirmationDoctor}
        title={confirmationDoctor?.isBlocked ? "Block Doctor" : "Unblock Doctor"}
        message={`Are you sure you want to ${
          confirmationDoctor?.isBlocked ? "block" : "unblock"
        } this doctor?`}
        onCancel={() => setConfirmationDoctor(null)}
        onConfirm={async () => {
          if (confirmationDoctor) {
            await handleBlockToggle(
              confirmationDoctor.id,
              confirmationDoctor.isBlocked
            );
            setConfirmationDoctor(null);
          }
        }}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default DoctorManagement;
