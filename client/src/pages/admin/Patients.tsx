import { useEffect, useState } from "react";
import { fetchPatients, togglePatientBlockStatus } from "../../services/admin/userService";
import CenteredConfirmationModal from "../../components/common/ConfirmationModal";
import type { IUser } from "../../types/UserType";

const PatientManagement = () => {
  const [patients, setPatients] = useState<IUser[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [confirmationPatient, setConfirmationPatient] = useState<{
    id: string;
    isBlocked: boolean;
  } | null>(null);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data.patients.filter((user: IUser) => user.role === "patient"));
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };

  const handleBlockToggle = async (id: string, block: boolean) => {
    try {
      await togglePatientBlockStatus(id, block);
      setPatients((prev) =>
        prev.map((pat) =>
          pat._id === id ? { ...pat, isBlocked: block } : pat
        )
      );
    } catch (error) {
      console.error("Error updating patient block status", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f7f9fb] min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 border-b pb-2">
        Patient Management
      </h2>

      {patients.length === 0 ? (
        <p className="text-gray-600 text-lg">No patients found</p>
      ) : (
        <div className="space-y-4 relative">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-5 bg-blue-100 text-blue-900 font-semibold px-6 py-3 rounded-md shadow-sm">
            <p>Patient ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Photo</p>
            <p className="text-right">Actions</p>
          </div>

          {/* Patient Rows */}
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="relative bg-white p-4 sm:p-6 rounded-md shadow-md border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 sm:gap-6">
                <p className="text-gray-700 font-medium text-sm sm:text-base">
                  <span className="md:hidden font-semibold">Patient ID: </span>
                  P-{patient._id?.slice(4, 8)}
                </p>

                <p className="text-gray-900 font-semibold text-sm sm:text-base">
                  <span className="md:hidden font-semibold">Name: </span>
                  {patient.name}
                </p>

                <p className="text-gray-700 text-sm sm:text-base">
                  <span className="md:hidden font-semibold">Email: </span>
                  {patient.email}
                </p>

                <div>
                  {patient.profilePicture && (
                    <img
                      src={patient.profilePicture}
                      alt="Profile"
                      className="w-14 h-14 object-cover rounded-full border"
                    />
                  )}
                </div>

                <div className="flex md:justify-end gap-2 sm:gap-1 flex-wrap">
                  <button
                    onClick={() =>
                      setConfirmationPatient({
                        id: patient._id!,
                        isBlocked: !patient.isBlocked,
                      })
                    }
                    className={`text-white px-4 py-1.5 text-sm rounded-md w-full md:w-auto ${
                      patient.isBlocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {patient.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() =>
                      setSelectedPatientId((prev) =>
                        prev === patient._id ? null : patient._id!
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 text-sm rounded-md w-full md:w-auto"
                  >
                    {selectedPatientId === patient._id ? "Hide" : "View"} Details
                  </button>
                </div>
              </div>

              {/* Patient Details */}
              {selectedPatientId === patient._id && (
                <div className="mt-4 border-t pt-4 text-sm text-gray-800 space-y-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p>
                      <span className="font-semibold">Phone:</span> {patient.phone || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Gender:</span> {patient.gender}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={
                          patient.isBlocked ? "text-red-600" : "text-green-600"
                        }
                      >
                        {patient.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <CenteredConfirmationModal
        isOpen={!!confirmationPatient}
        title={
          confirmationPatient?.isBlocked ? "Block Patient" : "Unblock Patient"
        }
        message={`Are you sure you want to ${
          confirmationPatient?.isBlocked ? "block" : "unblock"
        } this patient?`}
        onCancel={() => setConfirmationPatient(null)}
        onConfirm={async () => {
          if (confirmationPatient) {
            await handleBlockToggle(
              confirmationPatient.id,
              confirmationPatient.isBlocked
            );
            setConfirmationPatient(null);
          }
        }}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default PatientManagement;
